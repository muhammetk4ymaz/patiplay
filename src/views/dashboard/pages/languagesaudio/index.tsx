import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from '../../../../components/CustomTabBar';
import CustomText from '../../../../components/shared/CustomText';
import FlagComponent from '../../../../components/shared/FlagComponent';
import {FlagList} from '../../../../components/shared/FlagList';
import {ImageManager} from '../../../../constants/ImageManager';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import FeaturesTab from '../components/FeaturesTab';
import ShortsTab from '../components/ShortsTab';
import TvShowsTab from '../components/TvShowsTab';

const {width, height} = Dimensions.get('window');

type Props = {};

const LanguagesAudioView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  const [audioData, setAudioData] = React.useState<any>();

  const [currentAudioLang, setCurrentAudioLang] = React.useState('tr');

  const fetchAudioData = async () => {
    try {
      const response = await networkService.post('title/api/audio/', {
        lang: currentAudioLang,
      });

      console.log('Response Audio', response.data);
      setAudioData(response.data);
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
    fetchAudioData();
  }, [currentAudioLang]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
          backgroundColor: 'black',
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
        <FlagList
          flags={
            audioData.countries.length > 0
              ? audioData.countries.map((country: any) => country.iso2!)
              : []
          }
          onPress={(iso2: string) => {
            console.log('iso2', iso2.toLocaleLowerCase());
            setAudioData(iso2.toLocaleLowerCase());
          }}
        />
        <Header
          country={audioData.country}
          filmsLength={audioData.titles.length + audioData.shorts.length}
          seriesLength={audioData.series.length}
        />
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
          renderScene(route, audioData, () => {
            fetchAudioData();
          })
        }
      />
    </View>
  );
};

export default LanguagesAudioView;

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
  filmsLength: any;
  seriesLength: number;
  country: any;
};

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <View
          style={{
            elevation: 5,
            height: 45,
            width: 45,
            borderRadius: 45 / 2,
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {width: 2, height: 2},
            backgroundColor: 'white',
          }}>
          <FlagComponent isoCode={props.country.iso2} width={45} height={45} />
        </View>
        {/* <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            backgroundColor: '#4A90E2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            text="EN"
            weight="bold"
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.md,
              textAlign: 'center',
            }}
          />
        </View> */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <CustomText
            text={props.country.name + ' (Audio)'}
            // text="English (Subtitles)"
            weight="bold"
            style={styles.name}
          />
          <CustomText
            text={`${props.filmsLength} Films • ${props.seriesLength} TV Shows`}
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
  audioData: any,
  refreshData: () => void,
) => {
  switch (route.key) {
    case 'first':
      return <FeaturesTab data={audioData.titles} />;
    case 'second':
      return <ShortsTab data={audioData.shorts} />;
    case 'third':
      return <TvShowsTab data={audioData.series} />;
    case 'fourth':
      return (
        <CommentsTab
          data={audioData.comment}
          endpoint="audio-comment"
          uuid={audioData.country.iso2.toLowerCase()}
          refreshData={refreshData}
        />
      );
    case 'fifth':
      return (
        <DiscussionsTab
          data={audioData.discussion}
          endpoint="audio-discussion"
          uuid={audioData.country.iso2.toLowerCase()}
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
