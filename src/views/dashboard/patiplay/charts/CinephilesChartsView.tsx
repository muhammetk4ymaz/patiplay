import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import networkService from '../../../../helpers/networkService';
import {RootStackParamList} from '../../../../navigation/routes';
import {Theme} from '../../../../utils/theme';
import ChartOtherItem from './components/ChartOtherItem';
import {ImageManager} from '../../../../constants/ImageManager';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const {width} = Dimensions.get('window');

const CinephilesChartsView = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const [cinephiles, setCinephiles] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    console.log('Rendered CinephilesChartsView');

    const fetchCrewData = async () => {
      try {
        const response = await networkService.post('title/api/charts-view/', {
          tab: 'Cinephiles',
        });
        console.log('Response Cinephiles', response.data.cinephiles);
        setCinephiles(response.data.cinephiles);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);

            switch (error.response.status) {
              case 400:
                console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

                break;
              case 401:
                console.log(
                  'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
                );

                break;
              case 500:
                console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

                break;
              default:
                console.log(
                  'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
                );
            }
          } else if (error.request) {
            console.log(error.request);
            console.log(
              'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
            );
          } else {
            console.log('Error', error.message);
            console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
          }
        } else {
          console.log('Error', error);
          console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCrewData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <FlatList
        removeClippedSubviews={true}
        data={cinephiles.sort((a, b) => b.watched_video - a.watched_video)}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        keyExtractor={index => index.toString()}
        renderItem={({item, index}) => (
          <ChartOtherItem
            title={item.name + ' ' + item.surname}
            avatarUrl={
              item.avatar ? item.avatar : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
            }
            rate={index + 1}
            subtitle={'13 in My Network'}
            onPress={() => {
              navigation.navigate('CinephilesDetail', {
                username: item.username,
              });
            }}
          />
        )}></FlatList>
    );
  }
});

export default CinephilesChartsView;
