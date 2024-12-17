import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import InputErrorText from '../../components/shared/Texts/InputErrorText';
import {ImageManager} from '../../constants/ImageManager';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';
import PasswordTextField from '../auth/components/PasswordTextField';
import axios from 'axios';
import networkService from '../../helpers/networkService';

type Props = {};

type RouteParams = {
  NewPassword: {
    uuid: string;
  };
};

const NewPasswordView = (props: Props) => {
  const confirmPasswordRef = React.useRef<TextInput>(null);
  const route = useRoute<RouteProp<RouteParams, 'NewPassword'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [formError, setFormError] = useState('');
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
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

  const validatePassword = (value: string) => {
    setPassword(value);

    const length = value.length >= 8 && value.length <= 16;
    const uppercase = /[A-Z]/.test(value);
    const lowercase = /[a-z]/.test(value);
    const number = /[0-9]/.test(value);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setValidations({length, uppercase, lowercase, number, specialChar});
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordTouched(true);
    if (password !== value) {
      setFormError('Whoops! Looks like it’s not a match.Give it another shot!');
    } else {
      setFormError('');
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    try {
      const response = await networkService.post('api/user/reset-password/', {
        uuid: route.params.uuid,
        password: password,
      });
      console.log(response.data);
      navigation.dispatch(StackActions.replace('PasswordChangeSucces'));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              setError('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');
              break;
            case 401:
              setError(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );
              break;
            case 500:
              setError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
              break;
            default:
              setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
          }
        } else if (error.request) {
          console.log(error.request);
          setError(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setFormError('');

    if (password != confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (
      !validations.length ||
      !validations.uppercase ||
      !validations.lowercase ||
      !validations.number ||
      !validations.specialChar
    ) {
      setFormError('The password does not meet the specified criteria.');
      return;
    }
    Keyboard.dismiss();
    resetPassword();
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
                  text={'Change'}
                  backgroundColor="black"
                  border={true}
                  onPress={() => {
                    handleSubmit();
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
              text="New Password"
              style={{fontSize: 20, color: 'white', textAlign: 'center'}}
            /> */}
            <View style={{gap: 12}}>
              <View>
                <PasswordTextField
                  onChangeText={validatePassword}
                  onChange={() => setPasswordTouched(true)}
                  placeholder="New Password"
                  value={password}
                  onSubmitEditing={() => {
                    confirmPasswordRef.current?.focus();
                  }}
                />

                {passwordTouched && (
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 10,
                      justifyContent: 'center',
                    }}>
                    <CustomValidationControl
                      errorMessage="8-16 Characters"
                      validation={validations.length}
                    />
                    <CustomValidationControl
                      errorMessage="1 Uppercase Letter"
                      validation={validations.uppercase}
                    />
                    <CustomValidationControl
                      errorMessage="1 Lowercase Letter"
                      validation={validations.lowercase}
                    />
                    <CustomValidationControl
                      errorMessage="1 Number"
                      validation={validations.number}
                    />
                    <CustomValidationControl
                      errorMessage="1 Special Character"
                      validation={validations.specialChar}
                    />
                  </View>
                )}
              </View>
              <View>
                <PasswordTextField
                  onChangeText={validateConfirmPassword}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  returnKeyType="done"
                  ref={confirmPasswordRef}
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {formError && <InputErrorText errorMessage={formError} />}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {error && <InputErrorText errorMessage={error} />}
              </View>
            </View>
          </View>
        </ContentWithIconCard>
      </Animated.View>
    </SafeAreaView>
  );
};

export default NewPasswordView;

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

const CustomValidationControl = ({
  validation,
  errorMessage,
}: {
  validation: boolean;
  errorMessage: string;
}) => {
  return (
    <View>
      <CustomText
        text={validation ? '✓' + ' ' + errorMessage : '✗' + ' ' + errorMessage}
        style={{
          fontSize: Theme.fontSizes.xs,
          color: validation ? Theme.colors.lightGreen : Theme.colors.error,
        }}
      />
    </View>
  );
};
