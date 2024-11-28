import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
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
import TopMovie from '../../../../models/top_movie';
import ListHeaderText from '../../../../components/shared/ListHeaderText';
import KeepEnjoyingItem from '../../../../components/shared/CustomComponents/KeepEnjoyingItem';
import NewcomersItem from '../../../../components/shared/CustomComponents/NewcomersItem';
import TopChoicesItem from '../../../../components/shared/CustomComponents/TopChoicesItem';
import OnlyHereItem from '../../../../components/shared/CustomComponents/OnlyHereItem';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
const {width, height} = Dimensions.get('window');

const InTheatersView = () => {
  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title="Simultaneous Release?" />;
  }

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (isAuthenticated && loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
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
        <FlagList />
        <TitlesLists />
        {/* <View style={{gap: 12, paddingVertical: 8}}>
          <UnscrollableList
            title="Title-1"
            titles={popularTitles.slice(4, 20)}
          />
          <KeepEnjoying />
          <UnscrollableList
            title="Title-2"
            titles={nowPlayMovies.slice(2, 18)}
          />
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
        </View> */}
      </CustomPage>
    );
  }
};

export default InTheatersView;

const TitlesLists = React.memo(() => {
  const renderItem = useCallback(
    ({item}: {item: React.JSX.Element}) => item,
    [],
  );
  return (
    <FlatList
      data={componentList}
      scrollEnabled={false}
      removeClippedSubviews={true}
      keyExtractor={(item, index) => `component-${index}`}
      renderItem={({item}) => renderItem({item})}
      initialNumToRender={3}
      contentContainerStyle={{
        paddingVertical: 8,
        gap: Theme.spacing.columnGap,
      }}
    />
  );
});

const KeepEnjoying = React.memo(() => {
  const renderItem = useCallback(
    ({item, index}: {item: TopMovie; index: number}) => (
      <KeepEnjoyingItem item={item} index={index} />
    ),
    [],
  );

  return (
    <View style={{gap: Theme.spacing.columnGap}}>
      <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
        <ListHeaderText title="Keep Enjoying" />
      </View>
      <FlatList
        nestedScrollEnabled
        removeClippedSubviews={true}
        data={nowPlayMovies.slice(4, 9)}
        initialNumToRender={3}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.rowGap,
        }}
        renderItem={({item, index}) => renderItem({item, index})}
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

const componentList = [
  <UnscrollableList title="Title-1" titles={popularTitles.slice(4, 20)} />,
  <KeepEnjoying />,
  <UnscrollableList title="Title-2" titles={nowPlayMovies.slice(2, 18)} />,
  <NewComers />,
  <UnscrollableList
    title="Title-3"
    titles={popularTitles.concat(popularTitles.slice(0, 12))}
  />,
  <TopChoices />,
  <UnscrollableList
    title="Title-4"
    titles={topMovies.concat(topMovies.slice(0, 12))}
  />,
  <OnlyHere />,
];
