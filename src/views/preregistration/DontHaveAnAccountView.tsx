import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../constants/Theme';
import {AuthIcon} from '../../../assets/icons';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/CustomTextButton';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import EmailTextField from '../auth/components/EmailTextField';
import InputErrorText from '../../components/shared/InputErrorText';
import PasswordTextField from '../auth/components/PasswordTextField';
import CheckBox from '@react-native-community/checkbox';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';

type Props = {};

const DontHaveAnAccountView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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

  const register = async () => {};

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

      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {formError && <InputErrorText errorMessage={formError} />}
        </View>
      </View>

      <Pressable
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
      </Pressable>

      <View style={{alignSelf: 'center', marginTop: 20}}>
        <CustomTextButton
          text={'Continue'}
          onPress={() => {
            navigation.dispatch(StackActions.replace('PreVerification'));
          }}
          textColor="black"
          paddingHorizontal={36}
          paddingVertical={8}
        />
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
