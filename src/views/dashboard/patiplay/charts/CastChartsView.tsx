import React, {useCallback, useRef} from 'react';
import {useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import nowPlayMovies from '../../../../models/now_play_movies';
import {Theme} from '../../../../utils/theme';
import ChartOtherItem from './components/ChartOtherItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/routes';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {ImageManager} from '../../../../constants/ImageManager';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const {width} = Dimensions.get('window');

const CastChartsView = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    console.log('Rendered CastChartsView');

    const fetchCastData = async () => {
      try {
        const response = await networkService.post('title/api/charts-view/', {
          tab: 'Cast',
        });
        console.log('Response', response.data.cast);
        setCast(response.data.cast);
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

    fetchCastData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <FlatList
        removeClippedSubviews={true}
        data={cast.sort((a, b) => b.watched_video - a.watched_video)}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <ChartOtherItem
            title={item.name}
            avatarUrl={
              item.image
                ? {uri: item.image}
                : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
            }
            rate={index + 1}
            subtitle={'13 in My Network'}
            onPress={() => {
              navigation.navigate('CastDetail', {slug: item.slug});
            }}
          />
        )}></FlatList>
    );
  }
});

export default CastChartsView;
