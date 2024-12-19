import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/shared/CustomText';
import {Theme} from '../../utils/theme';
import AppNavigation from '../../navigation';
import storageService, {StorageKeys} from '../../helpers/storageService';
import {useAppDispatch} from '../../redux/hooks';
import networkService from '../../helpers/networkService';
import {loginAsync, setUser} from '../../redux/features/auth/authSlice';
import DeviceInfo from 'react-native-device-info';
import UpdateView from '../update';
import axios from 'axios';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import LoadingWidget from '../../components/shared/LoadingWidget';
import {ImageManager} from '../../constants/ImageManager';

type Props = {};

const SplashView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [needUpdate, setNeedUpdate] = React.useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = React.useState(true);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkAppVersion = async () => {
      const version = DeviceInfo.getVersion();
      try {
        const ANDROID_VERSION_URL = '';

        const IOS_VERSION_URL = '';

        const VERSION_URL = Platform.select({
          ios: IOS_VERSION_URL,
          android: ANDROID_VERSION_URL,
        });

        if (VERSION_URL) {
          networkService.get(VERSION_URL).then(async res => {
            if (res.data) {
              if (res.data.version !== version) {
                setNeedUpdate(true);
              }
            }
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);

            switch (error.response.status) {
              case 400:
                setError('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

                break;
              case 401:
                setError(
                  'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
                );

                break;
              case 500:
                setError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

                break;
              default:
                setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
            }
          } else if (error.request) {
            setError(
              'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
            );
          } else {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
          }
        } else {
          setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } finally {
        setIsCheckingUpdate(false);
      }
    };

    checkAppVersion();
  }, []);

  const checkAuth = async () => {
    if (!loading) {
      setLoading(true);
    }
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
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              setError('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

              break;
            case 401:
              setError(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );

              break;
            case 500:
              setError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

              break;
            default:
              setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
          }
        } else if (error.request) {
          setError(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  if (loading || isCheckingUpdate) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
        <Image
          source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
          style={{height: 100, width: 100, alignSelf: 'center'}}
        />
      </View>
    );
  } else if (error) {
    return (
      <View
        style={[
          styles.view,
          {
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
          },
        ]}>
        <CustomText text={error} style={{color: 'white'}} />
        <CustomTextButton text="Try again" onPress={checkAuth} />
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        {needUpdate ? <UpdateView /> : <AppNavigation />}
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
