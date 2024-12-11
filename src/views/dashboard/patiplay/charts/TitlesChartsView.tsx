import React, {memo, useCallback, useRef} from 'react';
import {useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import nowPlayMovies from '../../../../models/now_play_movies';
import {Theme} from '../../../../utils/theme';
import CustomText from '../../../../components/shared/CustomText';
import {ChartTitleItem} from './components/ChartTitleItem';
import topMovies from '../../../../models/topMovies';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';

const {width} = Dimensions.get('window');

interface Props {
  title: string;
}

const TitleChartsView = memo(({title}: Props) => {
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState<any[]>([]);

  console.log('TitleChartsView');

  React.useEffect(() => {
    console.log('Rendered TitleChartsView');

    const fetchTitlesData = async () => {
      try {
        const response = await networkService.post('title/api/charts-view/', {
          tab: 'Titles',
        });
        console.log('Response', response.data.title);
        setTitles(response.data.title);
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

    fetchTitlesData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={loading}
        />
      </View>
    );
  } else {
    return (
      <FlatList
        data={titles.sort((a, b) => b.watched_video - a.watched_video)}
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
          <ChartTitleItem item={item} index={index + 1} />
        )}></FlatList>
    );
  }
});

export default TitleChartsView;
