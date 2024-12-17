import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import IoIcons from 'react-native-vector-icons/Ionicons';
import ContentWithIconCard, {
  TermAndPrivacyText,
} from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import InputErrorText from '../../components/shared/Texts/InputErrorText';
import {ImageManager} from '../../constants/ImageManager';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';
import LoginButton from './components/LoginButton';
import LoginForm from './components/LoginForm';

type Props = {};

const AuthView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    register: registerFormLogin,
    control: controlFormLogin,
    handleSubmit: handleSubmitFormLogin,
    formState: {errors: errorsFormLogin},
  } = useForm({
    defaultValues: {
      email: 'emre.gungor@eytsoft.com',
      password: 'Emre.1234',
    },
  });

  const bottom = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: bottom.value,
    };
  });

  const [formError, setFormError] = useState<string>('');

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

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'black',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        },
      ]}>
      <Animated.View style={[animatedStyle]}>
        <ContentWithIconCard
          button={
            <LoginButton
              handleSubmit={handleSubmitFormLogin}
              onSubmitted={message => {
                setFormError(message);
              }}
            />
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
          <View style={{paddingBottom: 24, gap: 8}}>
            <LoginForm control={controlFormLogin} errors={errorsFormLogin} />
            <LoginOptions />
            {formError && (
              <View style={{alignSelf: 'center'}}>
                <InputErrorText errorMessage={formError} />
              </View>
            )}
          </View>
        </ContentWithIconCard>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 12,
            marginTop: 32,
          }}
          onPress={() => {
            navigation.navigate('SignUpWebView');
          }}>
          <CustomText
            text="Don't have an account?"
            style={{
              color: 'white',
              fontSize: 13,
              opacity: 0.7,
            }}
          />
        </TouchableOpacity>
      </Animated.View>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        <TermAndPrivacyText />
      </View>
    </SafeAreaView>
  );
};

export default AuthView;

const styles = StyleSheet.create({
  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    color: Theme.colors.white,
    fontSize: 13,
    opacity: 0.7,
  },
  dontHaveAccount: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
  },
});

const LoginOptions = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.loginOptions}>
      <TouchableOpacity
        onPress={() => {
          setToggleCheckBox(!toggleCheckBox);
        }}
        style={{
          padding: 4,
          flexDirection: 'row',
          gap: Platform.select({ios: 8, android: 5}),
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderColor: toggleCheckBox
              ? Theme.colors.primary
              : 'rgb(75, 85, 99)',
            borderWidth: 2,
            borderRadius: 24 / 4,
            alignItems: 'center',
          }}>
          <IoIcons
            name="checkmark"
            size={20}
            color={toggleCheckBox ? Theme.colors.primary : 'transparent'}
          />
        </View>
        <CustomText text="Remember Me" style={styles.forgotPassword} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}
        style={{
          padding: 4,
          // backgroundColor: 'red',
        }}>
        <CustomText text="Forgot Password?" style={styles.forgotPassword} />
      </TouchableOpacity>
    </View>
  );
};
