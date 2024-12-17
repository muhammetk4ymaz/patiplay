import {Avatar} from 'native-base';
import React, {useState} from 'react';
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
import {SceneMap} from 'react-native-tab-view';
import CustomTabBar from '../../../../components/CustomTabBar';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import {Theme} from '../../../../utils/theme';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import FeaturesTab from '../components/FeaturesTab';
import ShortsTab from '../components/ShortsTab';
import TvShowsTab from '../components/TvShowsTab';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DynamicHeader} from '../companies';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const {width, height} = Dimensions.get('window');

type RouteParams = {
  Release: {
    year: string;
  };
};

type Props = {};

const ReleaseDatesView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Release'>>();

  const [loading, setLoading] = React.useState(true);

  const [releaseData, setReleaseData] = React.useState<any>();

  const [currentYear, setCurrentYear] = React.useState(route.params.year);

  const fetchReleaseData = async () => {
    try {
      const response = await networkService.post('title/api/release-date/', {
        year: currentYear,
      });

      console.log('Response Release', response.data);

      setReleaseData(response.data);
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
    fetchReleaseData();
  }, [currentYear]);

  if (loading) {
    return <LoadingWidget />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <DynamicHeader componentHeight={height * 0.45}>
        <View
          style={{
            height: height * 0.45,
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
                height: height * 0.4,
              }}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={{width: width, height: height * 0.4}}
            />
          </View>
          <View>
            <FlatList
              data={releaseData.years}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: Theme.paddings.viewHorizontalPadding,
                gap: Theme.spacing.columnGap,
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentYear(item.toString());
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    backgroundColor: Theme.colors.sambucus,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    text={item.toString()}
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
          <Header count={releaseData.count} currentYear={currentYear} />
          <CustomText
            text="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
            style={{
              color: 'white',
              fontSize: 13,
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            }}
            weight="light"
          />
        </View>
      </DynamicHeader>

      <CustomTabBar
        routes={routes}
        renderScene={route =>
          renderScene(route, releaseData, currentYear, () => {
            fetchReleaseData();
          })
        }
      />
    </View>
  );
};

export default ReleaseDatesView;

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
  count: any;
  currentYear: string;
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
            backgroundColor: '#D7CCC8',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            text={props.currentYear}
            weight="bold"
            style={{
              color: '#424242',
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
            text={props.currentYear}
            weight="bold"
            style={styles.name}
          />
          <CustomText
            text={`${props.count.film} Films • ${props.count.series} TV Shows`}
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
  releaseData: any,
  currentYear: string,
  refreshData: () => void,
) => {
  switch (route.key) {
    case 'first':
      return <FeaturesTab data={releaseData.features} />;
    case 'second':
      return <ShortsTab data={releaseData.shorts} />;
    case 'third':
      return <TvShowsTab data={releaseData.series} />;
    case 'fourth':
      return (
        <CommentsTab
          data={releaseData.comment}
          endpoint="release-date-comment"
          uuid={currentYear}
          refreshData={refreshData}
        />
      );
    case 'fifth':
      return (
        <DiscussionsTab
          data={releaseData.discussion}
          endpoint="release-date-discussion"
          uuid={currentYear}
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
