import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthIcon} from '../../../assets/icons';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import InputErrorText from '../../components/shared/Texts/InputErrorText';
import {Theme} from '../../utils/theme';
import EmailTextField from '../auth/components/EmailTextField';
import PasswordTextField from '../auth/components/PasswordTextField';
import networkService from '../../helpers/networkService';
import axios from 'axios';

type Props = {};

const DontHaveAnAccountView = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard icon={<AuthIcon size={100} />}>
        <PreRegistrationForm />
      </ContentWithIconCard>
    </ScrollView>
  );
};

export default DontHaveAnAccountView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
    paddingVertical: 100,
  },

  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.5,
  },
  dontHaveAccount: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },
});

const PreRegistrationForm = (props: any) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('muhammetk4ymaz@hotmail.com');
  const [password, setPassword] = useState('1122332211Mk.');
  const [confirmPassword, setConfirmPassword] = useState('1122332211Mk.');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    try {
      const response = await networkService.post('api/user/register/', {
        email: email,
        password: password,
      });

      console.log(response.data);

      await networkService.post('api/user/send-mail/', {
        email: email,
        uuid: response.data.uuid,
      });

      networkService.setToken(response.data.data);

      navigation.dispatch(
        StackActions.replace('PreVerification', {
          uuid: response.data.uuid,
        }),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          setFormError(error.response.data.error);

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

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

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

  const handleSubmit = () => {
    Keyboard.dismiss();
    setFormError('');

    if (!email || !password || !confirmPassword) {
      setFormError('All fields must be filled');
      return;
    }

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
    register();
  };

  return (
    <View style={{gap: 12}}>
      <View>
        <EmailTextField onChangeText={validateEmail} value={email} />
        {emailError && <InputErrorText errorMessage={emailError} />}
      </View>

      <PasswordTextField
        onChangeText={validatePassword}
        onChange={() => setPasswordTouched(true)}
        placeholder="Password"
        value={password}
      />

      {passwordTouched && (
        <View
          style={{
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

      <PasswordTextField
        onChangeText={validateConfirmPassword}
        placeholder="Confirm Password"
        value={confirmPassword}
      />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {formError && <InputErrorText errorMessage={formError} />}
      </View>

      {/* <Pressable
        onPress={() => {
          setToggleCheckBox(!toggleCheckBox);
        }}
        style={{
          paddingLeft: Theme.paddings.viewHorizontalPadding,
          flexDirection: 'row',
          gap: Platform.select({ios: 12, android: 5}),
          alignItems: 'center',
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          boxType="square"
          onCheckColor={Theme.colors.primary}
          onTintColor="transparent"
          tintColors={{
            true: Theme.colors.primary,
            false: Theme.colors.white,
          }}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <CustomText text="Remember Me" style={styles.dontHaveAccount} />
      </Pressable> */}

      <View style={{alignSelf: 'center', marginTop: 20}}>
        {loading ? (
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        ) : (
          <CustomTextButton
            text={'Continue'}
            onPress={() => {
              handleSubmit();
            }}
            textColor="black"
            paddingHorizontal={36}
            paddingVertical={8}
          />
        )}
      </View>

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 12,
        }}
        onPress={() => {
          navigation.dispatch(StackActions.replace('AllReadyHaveAnAccount'));
        }}>
        <CustomText
          text="Already have an account?"
          style={{
            color: 'white',
            fontSize: 13,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

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
          color: validation ? Theme.colors.lightGreen : Theme.colors.error,
        }}
      />
    </View>
  );
};
