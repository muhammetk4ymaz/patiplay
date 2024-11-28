import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../constants/Theme';
import EmailTextField from './EmailTextField';
import PasswordTextField from './PasswordTextField';
import CustomText from '../../../components/shared/CustomText';
import CustomTextButton from '../../../components/shared/CustomTextButton';
import {Controller, useForm} from 'react-hook-form';
import InputErrorText from '../../../components/shared/InputErrorText';
import networkService from '../../../helpers/networkService';

type Props = {};

const RegisterForm = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    const response = await networkService.post('register/', data);
    console.log(response.data);
  };

  const password = watch('password');

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
      <View>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirm Password is required.',
            validate: value => value === password || 'Passwords do not match',
          }}
          render={({field: {onChange, value}}) => (
            <PasswordTextField
              onChangeText={onChange}
              placeholder="Confirm Password"
              error={errors.confirmPassword as boolean}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && (
          <InputErrorText
            errorMessage={errors.confirmPassword.message as string}
          />
        )}
      </View>

      <View style={styles.registerButton}>
        <CustomTextButton
          text="Kayıt Ol"
          paddingHorizontal={48}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </View>
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
        <TouchableOpacity>
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
  registerButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 6,
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
