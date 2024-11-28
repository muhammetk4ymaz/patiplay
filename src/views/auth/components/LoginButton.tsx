import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextButton from '../../../components/shared/CustomTextButton';
import networkService from '../../../helpers/networkService';
import {Theme} from '../../../constants/Theme';
import axios from 'axios';
import {useAppDispatch} from '../../../redux/hooks';
import {loginAsync, setUser} from '../../../redux/features/auth/authSlice';
import storageService, {StorageKeys} from '../../../helpers/storageService';

type Props = {
  handleSubmit: (onSubmit: any) => any;
  onSubmitted: (message: {}) => void;
};

const LoginButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await networkService.post('api/user/login/', data);
      console.log(response.data);
      props.onSubmitted('Giriş başarılı.');
      storageService.setItem(StorageKeys.ACCESS_TOKEN, response.data.data);
      dispatch(setUser(response.data.user.email, response.data.user.uuid));
      dispatch(loginAsync());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              props.onSubmitted(
                'Hatalı istek. Lütfen bilgilerinizi kontrol edin.',
              );
              break;
            case 401:
              props.onSubmitted(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );
              break;
            case 500:
              props.onSubmitted(
                'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
              );
              break;
            default:
              props.onSubmitted(
                'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          props.onSubmitted(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          props.onSubmitted('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        props.onSubmitted(
          'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.loginButton}>
      {loading ? (
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      ) : (
        <CustomTextButton
          text="Giriş Yap"
          paddingHorizontal={48}
          onPress={() => {
            props.handleSubmit(onSubmit)();
          }}
        />
      )}
    </View>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 6,
  },
});
