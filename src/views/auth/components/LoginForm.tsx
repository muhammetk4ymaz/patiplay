import React from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import InputErrorText from '../../../components/shared/Texts/InputErrorText';
import EmailTextField from './EmailTextField';
import PasswordTextField from './PasswordTextField';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  errors: FieldErrors;
  control: Control<LoginFormData>;
}

const LoginForm = (props: LoginFormProps) => {
  const passwordTextInputRef = React.useRef<TextInput>(null);

  return (
    <View style={{gap: 24}}>
      <View style={styles.view}>
        <View>
          <Controller
            control={props.control}
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
                error={props.errors.email !== undefined}
                onSubmitEditing={() => {
                  passwordTextInputRef.current?.focus();
                }}
              />
            )}
          />
          {props.errors.email && (
            <InputErrorText
              errorMessage={props.errors.email.message as string}
            />
          )}
        </View>
        <View>
          <Controller
            control={props.control}
            name="password"
            rules={{
              required: 'Password is required.',
            }}
            render={({field: {onChange, value}}) => (
              <PasswordTextField
                ref={passwordTextInputRef}
                onChangeText={onChange}
                placeholder="Password"
                error={props.errors.password !== undefined}
                value={value}
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
            )}
          />
          {props.errors.password && (
            <InputErrorText
              errorMessage={props.errors.password.message as string}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  view: {
    gap: 12,
  },
});
