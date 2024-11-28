import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/shared/CustomText';
import {Theme} from '../../constants/Theme';
import AppNavigation from '../../navigation';
import storageService, {StorageKeys} from '../../helpers/storageService';
import {useAppDispatch} from '../../redux/hooks';
import {loginAsync, setUser} from '../../redux/features/auth/authSlice';
import networkService from '../../helpers/networkService';

type Props = {};

const SplashView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        storageService.getItem(StorageKeys.ACCESS_TOKEN).then(token => {
          if (token) {
            // storageService.removeItem(StorageKeys.ACCESS_TOKEN);
            networkService.setToken(token);
            console.log('token', token);
            networkService.get('api/user/info/').then(async res => {
              if (res.data) {
                dispatch(setUser(res.data.data.email, res.data.data.uuid));
                await delay(200);
                dispatch(loginAsync());
              }
            });
          }
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.view,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <CustomText text="Loading..." style={{color: 'white'}} />
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <AppNavigation />
      </View>
    );
  }
};

export default SplashView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
