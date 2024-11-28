import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {Theme} from '../../../../constants/Theme';
import UnscrollableList from '../../home/components/UnscrollableList';
import CustomText from '../../../../components/shared/CustomText';
import nowPlayMovies from '../../../../models/now_play_movies';
import upComingTitles from '../../../../models/upcoming';
import popularTitles from '../../../../models/popular';
import LinearGradient from 'react-native-linear-gradient';
import topMovies from '../../../../models/topMovies';
import CustomPage from '../../../../components/shared/CustomPage';
import {FlagList} from '../../home';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import KeepEnjoyingItem from '../../../../components/shared/CustomComponents/KeepEnjoyingItem';
import NewcomersItem from '../../../../components/shared/CustomComponents/NewcomersItem';
import TopChoicesItem from '../../../../components/shared/CustomComponents/TopChoicesItem';
import OnlyHereItem from '../../../../components/shared/CustomComponents/OnlyHereItem';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
const {width, height} = Dimensions.get('window');

const OnTvView = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title="Latest Episodes?" />;
  }

  return (
    <CustomPage
      pageName="On Tv"
      animationMultiplier={0.7}
      isBackButton={true}
      titleInitialOpacity={1}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => (
            <VerticalPoster
              posterPath={item.poster_path}
              width={Dimensions.get('window').width * 0.7}
            />
          )}
        />
      </View>
      <FlagList />
      <View style={{gap: 12, paddingVertical: 8}}>
        <UnscrollableList title="Title-1" titles={popularTitles.slice(4, 20)} />
        <KeepEnjoying />
        <UnscrollableList title="Title-2" titles={nowPlayMovies.slice(2, 18)} />
        <NewComers />
        <UnscrollableList
          title="Title-3"
          titles={popularTitles.concat(popularTitles.slice(0, 12))}
        />
        <TopChoices />
        <UnscrollableList
          title="Title-4"
          titles={topMovies.concat(topMovies.slice(0, 12))}
        />
        <OnlyHere />
      </View>
    </CustomPage>
  );
};

export default OnTvView;

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
