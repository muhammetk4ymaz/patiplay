import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import nowPlayMovies from '../../../../models/now_play_movies';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import {useHeaderHeight} from '@react-navigation/elements';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
const {width} = Dimensions.get('window');

const posterWidth = (width - 2 * Theme.paddings.viewHorizontalPadding - 12) / 4;
const posterContainerWidth = calculateGridItemWidth(2);

const MovementsView = () => {
  const [movementsData, setMovementsDataData] = React.useState<any>([]);

  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  React.useEffect(() => {
    console.log('Rendered OnTvView');

    const fetchMovementsData = async () => {
      try {
        const response = await networkService.post(
          'title/api/movements-view/',
          {type: 'movements'},
        );
        console.log(response.data.movement);
        setMovementsDataData(response.data.movement);
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

    fetchMovementsData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  const headerHeight = useHeaderHeight();

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Film Movements?'} />;
  }

  return (
    <FlatList
      data={[...movementsData, ...movementsData]}
      keyExtractor={item => item.toString()}
      numColumns={2}
      columnWrapperStyle={{
        columnGap: Theme.spacing.columnGap,
      }}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        paddingVertical: 12,
        rowGap: Theme.spacing.rowGap,
      }}
      renderItem={({item}) => {
        return <MovementsCard item={item} />;
      }}
    />
  );
};

export default MovementsView;

const styles = StyleSheet.create({
  posterContainer: {
    flexDirection: 'row',
    flex: posterContainerWidth,
    height: (posterContainerWidth * 2) / 3 + 20,
  },
  poster: {
    width: posterWidth,
    aspectRatio: 2 / 3,
    position: 'absolute',
    borderRadius: 12,
  },
});

const MovementsCard = ({item}: {item: any}) => {
  return (
    <View style={{width: posterContainerWidth}}>
      <PosterStack posters={item.posters} />
      <View>
        <CustomText
          text={item.name}
          weight="medium"
          style={{color: 'white', textAlign: 'center'}}
        />
        <CustomText
          // text="1990s - Present"
          text={`${item.start_year}s - ${
            item.end_year ? item.end_year + 's' : 'Present'
          }`}
          weight="medium"
          style={{color: 'white', textAlign: 'center', opacity: 0.5}}
        />
      </View>
    </View>
  );
};

const PosterStack = ({posters}: {posters: any[]}) => {
  const numOfPosters = posters.length;
  const posterSpacing =
    (posterContainerWidth - posterWidth) / (numOfPosters - 1);

  return (
    <View style={{width: posterContainerWidth}}>
      <View style={styles.posterContainer}>
        {posters.reverse().map((poster, index) => {
          return (
            <View
              style={[
                styles.poster,
                {
                  zIndex: index,
                  right: index * posterSpacing,
                },
              ]}
              key={poster.id}>
              <Image
                source={{
                  uri: poster.url,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
