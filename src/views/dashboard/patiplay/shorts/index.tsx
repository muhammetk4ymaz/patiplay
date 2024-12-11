import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import UnscrollableTitleList from '../../../../components/shared/UnscrollableTitleList';
import CustomText from '../../../../components/shared/CustomText';
import nowPlayMovies from '../../../../models/now_play_movies';
import upComingTitles from '../../../../models/upcoming';
import popularTitles from '../../../../models/popular';
import LinearGradient from 'react-native-linear-gradient';
import topMovies from '../../../../models/topMovies';
import CustomPage from '../../../../components/shared/CustomPage';
import {DelayedComponent} from '../../home';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import KeepEnjoyingItem from '../../../../components/shared/CustomComponents/KeepEnjoyingItem';
import NewcomersItem from '../../../../components/shared/CustomComponents/NewcomersItem';
import TopChoicesItem from '../../../../components/shared/CustomComponents/TopChoicesItem';
import OnlyHereItem from '../../../../components/shared/CustomComponents/OnlyHereItem';
import {useAppSelector} from '../../../../redux/hooks';

import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import {RootState} from '../../../../redux/store';
import {FlagList} from '../../../../components/shared/FlagList';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {CountryModel} from '../../../../models/patiplay/CountryModel';

const ShortsView = () => {
  const [shortsData, setShortsData] = React.useState<any>([]);
  const [countryData, setCountryData] = React.useState<CountryModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title="Short Films?" />;
  }

  React.useEffect(() => {
    console.log('Rendered ShortsView');

    const fetchShortsData = async () => {
      try {
        const response = await networkService.get('title/api/shorts-view/');
        console.log(response.data.title);
        setShortsData(response.data.title);
        setCountryData(response.data.countries);
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

    fetchShortsData();
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

  return (
    <CustomPage
      pageName="Shorts"
      animationMultiplier={0.7}
      isBackButton={true}
      titleInitialOpacity={1}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => (
            <VerticalPoster
              width={Dimensions.get('window').width * 0.7}
              posterPath={item.poster_path}
            />
          )}
        />
      </View>
      <FlagList
        flags={
          countryData.length > 0
            ? countryData.map(country => country.iso2!)
            : []
        }
      />
      <View style={{gap: 12, paddingVertical: 8}}>
        <DelayedComponent delay={100}>
          <UnscrollableTitleList
            title="Title-1"
            titles={shortsData.slice(0, 16)}
            keyExtractor="shorts-title-1"
          />
        </DelayedComponent>
        <DelayedComponent delay={400}>
          <KeepEnjoying />
        </DelayedComponent>
        <DelayedComponent delay={500}>
          <UnscrollableTitleList
            title="Title-2"
            titles={nowPlayMovies.slice(2, 18)}
            keyExtractor="shorts-title-2"
          />
        </DelayedComponent>
        <DelayedComponent delay={600}>
          <NewComers />
        </DelayedComponent>

        <DelayedComponent delay={700}>
          <UnscrollableTitleList
            title="Title-3"
            titles={popularTitles.concat(popularTitles.slice(0, 12))}
            keyExtractor="shorts-title-3"
          />
        </DelayedComponent>
        <DelayedComponent delay={800}>
          <TopChoices />
        </DelayedComponent>

        <DelayedComponent delay={900}>
          <UnscrollableTitleList
            title="Title-4"
            titles={topMovies.concat(topMovies.slice(0, 12))}
            keyExtractor="shorts-title-4"
          />
        </DelayedComponent>
        <DelayedComponent delay={1000}>
          <OnlyHere />
        </DelayedComponent>
      </View>
    </CustomPage>
  );
};

export default ShortsView;

const KeepEnjoying = React.memo(() => {
  return (
    <View style={{gap: 12}}>
      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <CustomText
          text={'Keep Enjoying'}
          style={{color: Theme.colors.white, fontSize: Theme.fontSizes.lg}}
          weight="medium"
        />
      </View>
      <FlatList
        removeClippedSubviews={true}
        data={nowPlayMovies.slice(4, 9)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
        }}
        renderItem={({item, index}) => (
          <KeepEnjoyingItem item={item} index={index} />
        )}
      />
    </View>
  );
});

const NewComers = React.memo(() => {
  return (
    <View style={{gap: 12}}>
      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <CustomText
          text={'Newcomers'}
          style={{color: Theme.colors.white, fontSize: Theme.fontSizes.lg}}
          weight="medium"
        />
      </View>
      <FlatList
        data={upComingTitles.slice(12, 20)}
        horizontal
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
        }}
        renderItem={({item, index}) => (
          <NewcomersItem item={item} index={index} />
        )}
      />
    </View>
  );
});

const TopChoices = React.memo(() => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          position: 'absolute',
          zIndex: 1,
        }}>
        <CustomText
          text={'Top Choices'}
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes.lg,
          }}
          weight="medium"
        />
      </View>
      <FlatList
        data={popularTitles.slice(12, 20)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        removeClippedSubviews={true}
        renderItem={({item}) => <TopChoicesItem item={item} />}
      />
    </View>
  );
});

const OnlyHere = React.memo(() => {
  return (
    <View
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        paddingVertical: 32,
      }}>
      <View style={[{opacity: 1}, StyleSheet.absoluteFillObject]}>
        <LinearGradient
          colors={['black', Theme.colors.primary, 'black']} // Bordo tonları
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          marginBottom: 12,
        }}>
        <CustomText
          text={'Only Here'}
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes.lg,
          }}
          weight="medium"
        />
      </View>

      <FlatList
        data={popularTitles.slice(0, 5)}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <OnlyHereItem item={item} />}
      />
    </View>
  );
});
