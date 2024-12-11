import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from '../../../../components/CustomTabBar';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import FeaturesTab from '../components/FeaturesTab';
import ShortsTab from '../components/ShortsTab';
import TvShowsTab from '../components/TvShowsTab';
import {RouteProp, useRoute} from '@react-navigation/native';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';

const {width, height} = Dimensions.get('window');

type Props = {};

type RouteParams = {
  Genre: {
    slug: string;
  };
};

const GenresView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Genre'>>();

  const [loading, setLoading] = React.useState(true);

  const [genreData, setGenreData] = React.useState<any>();

  const [currentGenreSlug, setCurrentGenreSlug] = React.useState(
    route.params.slug,
  );

  const fetchGenreData = async () => {
    try {
      const response = await networkService.post('title/api/genre/', {
        slug: currentGenreSlug,
      });
      console.log('Response Genre', response.data);

      setGenreData(response.data);
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

  React.useEffect(() => {
    fetchGenreData();
  }, [currentGenreSlug]);

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
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 0.35,
          justifyContent: 'flex-end',
          gap: 12,
          zIndex: 0,
          marginBottom: 12,
        }}>
        <View style={{flex: 1}}>
          <Image
            source={ImageManager.IMAGE_NAMES.DETAILBACKGROUND}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: width,
              height: height * 0.3,
            }}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{width: width, height: height * 0.3}}
          />
        </View>
        <View>
          <FlatList
            data={genreData.genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              gap: Theme.spacing.columnGap,
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrentGenreSlug(item.slug);
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  backgroundColor: '#F5A623',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text={item.name[0].toUpperCase()}
                  weight="bold"
                  style={{
                    color: Theme.colors.white,
                    fontSize: Theme.fontSizes.md,
                    textAlign: 'center',
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <Header counts={genreData.counts} genre={genreData.genre} />
      </View>
      <CustomText
        text="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
        style={{
          color: 'white',
          fontSize: 13,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="light"
      />
      <CustomTabBar
        routes={routes}
        renderScene={route =>
          renderScene(route, genreData, () => {
            fetchGenreData();
          })
        }
      />
    </View>
  );
};

export default GenresView;

const styles = StyleSheet.create({
  header: {
    width: width,
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    flexDirection: 'row',
    gap: 12,
  },
  name: {
    color: 'white',
    fontSize: Theme.fontSizes.lg,
  },
});

type HeaderProps = {
  counts: any;
  genre: any;
};

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            backgroundColor: '#4A90E2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            text={props.genre.name[0].toUpperCase()}
            weight="bold"
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.md,
              textAlign: 'center',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <CustomText
            text={props.genre.name}
            weight="bold"
            style={styles.name}
          />
          <CustomText
            text={`${props.counts.film} Films • ${props.counts.series} TV Shows`}
            // text="1.4K Film • 13.2K TV Shows"
            style={{
              color: 'white',
              opacity: 0.7,
              fontSize: Theme.fontSizes.xs,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const renderScene = (
  {route}: {route: {key: string; title: string}},
  genreData: any,
  refreshData: () => void,
) => {
  switch (route.key) {
    case 'first':
      return <FeaturesTab data={genreData.features} />;
    case 'second':
      return <ShortsTab data={genreData.shorts} />;
    case 'third':
      return <TvShowsTab data={genreData.series} />;
    case 'fourth':
      return (
        <CommentsTab
          data={genreData.comment}
          endpoint="genre-comment"
          uuid={genreData.genre.slug}
          refreshData={refreshData}
        />
      );
    case 'fifth':
      return (
        <DiscussionsTab
          data={genreData.discussion}
          endpoint="genre-discussion"
          uuid={genreData.genre.slug}
        />
      );

    default:
      return null;
  }
};

const routes = [
  {key: 'first', title: 'Features'},
  {key: 'second', title: 'Shorts'},
  {key: 'third', title: 'TV Shows'},
  {key: 'fourth', title: 'Comments'},
  {key: 'fifth', title: 'Discussions'},
];
