import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import {ImageManager} from '../../constants/ImageManager';
import {Theme} from '../../utils/theme';
import LoginButton from './components/LoginButton';
import LoginForm from './components/LoginForm';
import RegisterButton from './components/RegisterButton';
import RegisterForm from './components/RegisterForm';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

const AuthView = (props: Props) => {
  const [auth = 'login', setAuth] = useState<string>();

  const registerFormRef = React.useRef();

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <ContentWithIconCard
          button={
            auth === 'login' ? (
              <LoginButton
                handleSubmit={handleSubmitFormLogin}
                onSubmitted={message => {
                  console.log(message);
                }}
              />
            ) : (
              <RegisterButton
                handleSubmit={() => {
                  if (registerFormRef.current) {
                    registerFormRef.current.handleSubmit();
                  }
                }}
              />
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
          {auth === 'login' ? (
            <LoginForm control={controlFormLogin} errors={errorsFormLogin} />
          ) : (
            <RegisterForm ref={registerFormRef} />
          )}
        </ContentWithIconCard>
        {auth === 'login' ? (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              padding: 12,
              marginTop: 32,
            }}
            onPress={() => {}}>
            <CustomText
              text="Don't have an account?"
              style={{
                color: 'white',
                fontSize: 13,
                opacity: 0.7,
              }}
            />
          </TouchableOpacity>
        ) : (
          // <View
          //   style={{
          //     justifyContent: 'center',
          //     flexDirection: 'row',
          //     gap: 5,
          //     marginTop: 44,
          //     alignItems: 'center',
          //   }}>
          //   <CustomText text="Hesabınız yok mu?" style={styles.dontHaveAccount} />
          //   <TouchableOpacity
          //     onPress={() => {
          //       setAuth('register');
          //     }}>
          //     <CustomText text="Şimdi Kaydolun" style={styles.register} />
          //   </TouchableOpacity>
          // </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 5,
              marginTop: 32,
              alignItems: 'center',
            }}>
            <CustomText
              text="Zaten bir hesabınız var mı?"
              style={styles.alreadyHaveAccount}
            />
            <TouchableOpacity
              onPress={() => {
                setAuth('login');
              }}>
              <CustomText text="Şimdi Giriş Yap" style={styles.login} />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
    paddingVertical: 100,
  },
  register: {
    color: Theme.colors.lilageode,
    fontSize: Theme.fontSizes.sm,
    fontWeight: 'bold',
  },
  dontHaveAccount: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },
  login: {
    color: Theme.colors.lilageode,
    fontSize: Theme.fontSizes.sm,
    fontWeight: 'bold',
  },
  alreadyHaveAccount: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },
});
