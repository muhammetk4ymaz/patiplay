import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import networkService from '../../../../helpers/networkService';
import {RootStackParamList} from '../../../../navigation/routes';
import {Theme} from '../../../../utils/theme';
import ChartOtherItem from './components/ChartOtherItem';
import {ImageManager} from '../../../../constants/ImageManager';

const {width} = Dimensions.get('window');

const CrewChartsView = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const [crew, setCrew] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    console.log('Rendered CrewChartsView');

    const fetchCrewData = async () => {
      try {
        const response = await networkService.post('title/api/charts-view/', {
          tab: 'Crew',
        });
        console.log('Response', response.data.crew);
        setCrew(response.data.crew);
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
        removeClippedSubviews={true}
        data={crew.sort((a, b) => b.watched_video - a.watched_video)}
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
              navigation.navigate('CrewDetail', {slug: item.slug});
            }}
          />
        )}></FlatList>
    );
  }
});

export default CrewChartsView;
