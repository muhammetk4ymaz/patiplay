import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import InputErrorText from '../../components/shared/Texts/InputErrorText';
import {ImageManager} from '../../constants/ImageManager';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';
import EmailTextField from '../auth/components/EmailTextField';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import networkService from '../../helpers/networkService';
import axios from 'axios';
import IconIonicons from 'react-native-vector-icons/AntDesign';

type Props = {};

const ForgotPasswordView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const bottom = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: bottom.value,
    };
  });

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        bottom.value = withTiming(200);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        bottom.value = withTiming(0);
      },
    );

    // Event listener'ları temizle
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await networkService.post(
        'api/user/send-with-email-mail/',
        {
          email: data.email,
          html_type: 'verification',
        },
      );
      console.log(response.data);
      const uuid = response.data.uuid;
      navigation.dispatch(
        StackActions.replace('Verification', {
          uuid: uuid,
        }),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          setError(error.response.data.error);
          switch (error.response.status) {
            case 400:
              console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');
              break;
            case 401:
              console.log(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );
              break;
            case 500:
              console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
              break;
            default:
              console.log(
                'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          console.log(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      <Animated.View style={animatedStyle}>
        <ContentWithIconCard
          button={
            loading ? (
              <View
                style={{
                  backgroundColor: 'black',
                  paddingHorizontal: 24,
                }}>
                <ActivityIndicator size="large" color={Theme.colors.primary} />
              </View>
            ) : (
              <View style={{backgroundColor: 'black'}}>
                <CustomTextButton
                  text={'Continue'}
                  backgroundColor="black"
                  border={true}
                  onPress={() => {
                    handleSubmit(onSubmit)();
                  }}
                  paddingHorizontal={36}
                />
              </View>
            )
          }
          icon={
            <Image
              source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
              style={{
                height: 80,
                width: 80,
              }}
            />
          }>
          <View style={{paddingBottom: 24, gap: 24}}>
            {/* <CustomText
              text="Forgot Password?"
              style={{fontSize: 20, color: 'white', textAlign: 'center'}}
            /> */}
            <View style={{gap: 12}}>
              <View>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({field: {onChange, value}}) => (
                    <EmailTextField
                      onChangeText={onChange}
                      value={value}
                      returnKeyType="done"
                      error={errors.email !== undefined}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <InputErrorText
                    errorMessage={errors.email.message as string}
                  />
                )}
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {error && <InputErrorText errorMessage={error} />}
              </View>
            </View>
          </View>
        </ContentWithIconCard>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 32,
          }}>
          <CustomTextButton
            text={'Close'}
            backgroundColor="black"
            textColor="rgba(255, 255, 255, 0.7)"
            onPress={() => {
              navigation.goBack();
            }}
            paddingHorizontal={36}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ForgotPasswordView;

const styles = StyleSheet.create({
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.7,
  },
  releaseText: {
    textAlign: 'center',
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.white,
  },
});
