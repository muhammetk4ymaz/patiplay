import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../../constants/Theme';
import EmailTextField from './EmailTextField';
import PasswordTextField from './PasswordTextField';
import CheckBox from '@react-native-community/checkbox';
import CustomText from '../../../components/shared/CustomText';
import {Controller, useForm} from 'react-hook-form';
import InputErrorText from '../../../components/shared/InputErrorText';
import LoginButton from './LoginButton';

const LoginForm = (props: any) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'muhammetk4ymaz@hotmail.com',
      password: '1122332211Mk.',
    },
  });

  return (
    <View style={styles.view}>
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
              error={errors.email as boolean}
            />
          )}
        />
        {errors.email && (
          <InputErrorText errorMessage={errors.email.message as string} />
        )}
      </View>
      <View>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required.',
          }}
          render={({field: {onChange, value}}) => (
            <PasswordTextField
              onChangeText={onChange}
              placeholder="Password"
              error={errors.password as boolean}
              value={value}
            />
          )}
        />
        {errors.password && (
          <InputErrorText errorMessage={errors.password.message as string} />
        )}
      </View>
      <View style={styles.loginOptions}>
        <Pressable
          onPress={() => {
            setToggleCheckBox(!toggleCheckBox);
          }}
          style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            tintColors={{
              true: Theme.colors.primary,
              false: Theme.colors.white,
            }}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <CustomText text="Beni Hatırla" style={styles.dontHaveAccount} />
        </Pressable>
        <TouchableOpacity>
          <CustomText
            text="Şifrenizi mi unuttunuz?"
            style={styles.forgotPassword}
          />
        </TouchableOpacity>
      </View>
      <LoginButton
        handleSubmit={handleSubmit}
        onSubmitted={message => {
          console.log(message);
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 5,
        }}>
        <CustomText text="Hesabınız yok mu?" style={styles.dontHaveAccount} />
        <TouchableOpacity
          onPress={() => {
            props.setAuth('register');
          }}>
          <CustomText text="Şimdi Kaydolun" style={styles.register} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  view: {
    gap: 16,
  },
  register: {
    color: Theme.colors.lilageode,
    fontSize: Theme.fontSizes.sm,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    fontWeight: 'bold',
  },
  dontHaveAccount: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },

  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
