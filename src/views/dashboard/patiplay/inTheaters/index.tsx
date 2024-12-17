import React, {useCallback} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomPage from '../../../../components/shared/CustomPage';
import nowPlayMovies from '../../../../models/now_play_movies';
import popularTitles from '../../../../models/popular';
import topMovies from '../../../../models/topMovies';
import upComingTitles from '../../../../models/upcoming';
import {Theme} from '../../../../utils/theme';
import {DelayedComponent} from '../../home';
import UnscrollableTitleList from '../../../../components/shared/UnscrollableTitleList';
import KeepEnjoyingItem from '../../../../components/shared/CustomComponents/KeepEnjoyingItem';
import NewcomersItem from '../../../../components/shared/CustomComponents/NewcomersItem';
import OnlyHereItem from '../../../../components/shared/CustomComponents/OnlyHereItem';
import TopChoicesItem from '../../../../components/shared/CustomComponents/TopChoicesItem';
import {FlagList} from '../../../../components/shared/FlagList';
import ListHeaderText from '../../../../components/shared/Texts/ListHeaderText';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import TopMovie from '../../../../models/top_movie';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {CountryModel} from '../../../../models/patiplay/CountryModel';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const InTheatersView = () => {
  const [loading, setLoading] = React.useState(true);

  const [inTheatersData, setInTheatersData] = React.useState<any[]>([]);
  const [countryData, setCountryData] = React.useState<CountryModel[]>([]);
  const [keepEnjoyingData, setKeepEnjoyingData] = React.useState<any[]>([]);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  React.useEffect(() => {
    console.log('Rendered InTheatersView');

    const fetchInTheatersData = async () => {
      try {
        const response = await networkService.get(
          'title/api/in-theaters-view/',
        );
        console.log(response.data.title);
        setInTheatersData(response.data.title);
        setCountryData(response.data.countries);
        setKeepEnjoyingData(
          (response.data.keep_enjoying as []).filter(
            (item: any) => item.video.video_type === 'Title',
          ),
        );
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

    fetchInTheatersData();
  }, []);

  if (!isAuthenticated) {
    return <PreRegistrationView title="Simultaneous Release?" />;
  }

  if (isAuthenticated && loading) {
    return <LoadingWidget />;
  } else {
    return (
      <CustomPage
        pageName="In Theaters"
        animationMultiplier={0.7}
        titleInitialOpacity={1}
        isBackButton={true}>
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
              titles={inTheatersData.slice(0, 12)}
              keyExtractor="intheaters-titles-1"
            />
          </DelayedComponent>
          <DelayedComponent delay={400}>
            <KeepEnjoying data={keepEnjoyingData} />
          </DelayedComponent>
          <DelayedComponent delay={500}>
            <UnscrollableTitleList
              title="Title-2"
              titles={nowPlayMovies.slice(2, 18)}
              keyExtractor="intheaters-titles-2"
            />
          </DelayedComponent>
          <DelayedComponent delay={600}>
            <NewComers />
          </DelayedComponent>

          <DelayedComponent delay={700}>
            <UnscrollableTitleList
              title="Title-3"
              titles={popularTitles.concat(popularTitles.slice(0, 12))}
              keyExtractor="intheaters-titles-3"
            />
          </DelayedComponent>
          <DelayedComponent delay={800}>
            <TopChoices />
          </DelayedComponent>

          <DelayedComponent delay={900}>
            <UnscrollableTitleList
              title="Title-4"
              titles={topMovies.concat(topMovies.slice(0, 12))}
              keyExtractor="intheaters-titles-4"
            />
          </DelayedComponent>
          <DelayedComponent delay={1000}>
            <OnlyHere />
          </DelayedComponent>
        </View>
      </CustomPage>
    );
  }
};

export default InTheatersView;

type KeepEnjoyingItemProps = {
  data: any;
};

const KeepEnjoying = React.memo((props: KeepEnjoyingItemProps) => {
  console.log('KeepEnjoyingData', props.data);

  return (
    <View style={{gap: Theme.spacing.columnGap}}>
      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <ListHeaderText title="Keep Enjoying" />
      </View>
      <FlatList
        nestedScrollEnabled
        removeClippedSubviews={true}
        data={props.data}
        initialNumToRender={3}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.columnGap,
        }}
        renderItem={({item, index}) => (
          <KeepEnjoyingItem item={item} index={index} type="Title" />
        )}
      />
    </View>
  );
});

const NewComers = React.memo(() => {
  const renderItem = useCallback(
    ({item, index}: {item: TopMovie; index: number}) => (
      <NewcomersItem item={item} index={index} />
    ),
    [],
  );

  return (
    <View style={{gap: Theme.spacing.columnGap}}>
      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <ListHeaderText title="Newcomers" />
      </View>
      <FlatList
        data={upComingTitles.slice(12, 20)}
        horizontal
        nestedScrollEnabled
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
        }}
        renderItem={({item, index}) => renderItem({item, index})}
      />
    </View>
  );
});

const TopChoices = React.memo(() => {
  const renderItem = useCallback(
    ({item}: {item: TopMovie}) => <TopChoicesItem item={item} />,
    [],
  );
  return (
    <View>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          position: 'absolute',
          zIndex: 1,
        }}>
        <ListHeaderText title="Top Choices" />
      </View>
      <FlatList
        data={popularTitles.slice(12, 20)}
        horizontal
        initialNumToRender={1}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        removeClippedSubviews={true}
        renderItem={({item}) => renderItem({item})}
      />
    </View>
  );
});

const OnlyHere = React.memo(() => {
  const renderItem = useCallback(
    ({item}: {item: TopMovie}) => <OnlyHereItem item={item} />,
    [],
  );
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
        <ListHeaderText title="Only Here" />
      </View>

      <FlatList
        data={popularTitles.slice(0, 5)}
        horizontal
        nestedScrollEnabled
        initialNumToRender={1}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => renderItem({item})}
      />
    </View>
  );
});
