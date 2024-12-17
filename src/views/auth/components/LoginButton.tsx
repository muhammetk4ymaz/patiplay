import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomTextButton from '../../../components/shared/Buttons/CustomTextButton';
import networkService from '../../../helpers/networkService';
import storageService, {StorageKeys} from '../../../helpers/storageService';
import {RootStackParamList} from '../../../navigation/routes';
import {loginAsync, setUser} from '../../../redux/features/auth/authSlice';
import {useAppDispatch} from '../../../redux/hooks';
import {Theme} from '../../../utils/theme';

type Props = {
  handleSubmit: (onSubmit: any) => any;
  onSubmitted: (message: string) => void;
};

const LoginButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await networkService.post('api/user/login/', data);
      console.log(response.data);
      // navigation.navigate('AllReadyHaveAnAccount');
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
                'The login failed, please check your information and try again.',
              );
              break;
            case 401:
              props.onSubmitted(
                'Unauthorized entry. Please check your email and password.',
              );
              break;
            case 500:
              props.onSubmitted('Server error. Please try again later.');
              break;
            default:
              props.onSubmitted(
                'An unexpected error occurred. Please try again.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          props.onSubmitted(
            'The server cannot be reached. Please check your internet connection.',
          );
        } else {
          console.log('Error', error.message);
          props.onSubmitted('An error has occurred. Please try again.');
        }
      } else {
        console.log('Error', error);
        props.onSubmitted('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginButton}>
      {loading ? (
        <View
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 24,
          }}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      ) : (
        <View style={{backgroundColor: 'black'}}>
          <CustomTextButton
            border={true}
            text="Sign In"
            paddingHorizontal={36}
            backgroundColor="black"
            onPress={() => {
              props.handleSubmit(onSubmit)();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
