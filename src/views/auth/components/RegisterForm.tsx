import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../../constants/Theme';
import EmailTextField from './EmailTextField';
import PasswordTextField from './PasswordTextField';
import CustomText from '../../../components/shared/CustomText';
import InputErrorText from '../../../components/shared/InputErrorText';
import networkService from '../../../helpers/networkService';
import {useNavigation} from '@react-navigation/native';
import RegisterButton from './RegisterButton';

type Props = {};

const RegisterForm = (props: any) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('muhammetk4ymaz@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const register = async () => {
    try {
      const response = await networkService.post('register/', {
        email: email,
        password: password,
      });
      console.log(response.data);
      networkService.post('send-mail/', {
        email: email,
        uuid: response.data.uuid,
      });
      const uuid = response.data.uuid;
      navigation.navigate('Verification', {uuid});
    } catch (error) {
      setFormError(error.response.data.error);
    }
  };

  const validateEmail = value => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = value => {
    setPassword(value);

    const length = value.length >= 8 && value.length <= 16;
    const uppercase = /[A-Z]/.test(value);
    const lowercase = /[a-z]/.test(value);
    const number = /[0-9]/.test(value);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setValidations({length, uppercase, lowercase, number, specialChar});
  };

  const validateConfirmPassword = value => {
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
    <View style={styles.view}>
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
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
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

      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {formError && <InputErrorText errorMessage={formError} />}
        </View>
      </View>
      <RegisterButton handleSubmit={handleSubmit} />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 5,
        }}>
        <CustomText
          text="Zaten bir hesabınız var mı?"
          style={styles.alreadyHaveAccount}
        />
        <TouchableOpacity
          onPress={() => {
            props.setAuth('login');
          }}>
          <CustomText text="Şimdi Giriş Yap" style={styles.login} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  view: {
    gap: 16,
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
