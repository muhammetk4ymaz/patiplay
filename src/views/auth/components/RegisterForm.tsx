import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import CustomText from '../../../components/shared/CustomText';
import InputErrorText from '../../../components/shared/Texts/InputErrorText';
import networkService from '../../../helpers/networkService';
import {RootStackParamList} from '../../../navigation/routes';
import {Theme} from '../../../utils/theme';
import EmailTextField from './EmailTextField';
import PasswordTextField from './PasswordTextField';

type Props = {};

const RegisterForm = React.forwardRef((props: Props, ref) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('muhammetk4ymaz@hotmail.com');
  const [password, setPassword] = useState('1122332211Mk');
  const [confirmPassword, setConfirmPassword] = useState('1122332211Mk');
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

  React.useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const register = async () => {
    try {
      const response = await networkService.post('api/user/register/', {
        email: email,
        password: password,
      });
      console.log(response.data);
      await networkService.post('api/user/send-mail/', {
        email: email,
        uuid: response.data.uuid,
        html_type: 'verification',
      });
      const uuid = response.data.uuid;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          setFormError(error.response.data.error);
        }
      }
    }
  };

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
      setFormError('Oops, something went wrong. Please try again.');
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
    </View>
  );
});

export default RegisterForm;

const styles = StyleSheet.create({
  view: {
    gap: 12,
    paddingBottom: 24,
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
