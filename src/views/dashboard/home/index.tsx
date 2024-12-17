import React, {useCallback} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import KeepEnjoyingItem from '../../../components/shared/CustomComponents/KeepEnjoyingItem';
import NewcomersItem from '../../../components/shared/CustomComponents/NewcomersItem';
import OnlyHereItem from '../../../components/shared/CustomComponents/OnlyHereItem';
import TopChoicesItem from '../../../components/shared/CustomComponents/TopChoicesItem';
import CustomPage from '../../../components/shared/CustomPage';
import {FlagList} from '../../../components/shared/FlagList';
import ListHeaderText from '../../../components/shared/Texts/ListHeaderText';
import TitleCarousel from '../../../components/shared/TitleCarousel';
import VerticalPoster from '../../../components/shared/VerticalPoster';
import nowPlayMovies from '../../../models/now_play_movies';
import popularTitles from '../../../models/popular';
import TopMovie from '../../../models/top_movie';
import topMovies from '../../../models/topMovies';
import upComingTitles from '../../../models/upcoming';
import {RootState} from '../../../redux/store';
import {Theme} from '../../../utils/theme';
import PreRegistrationView from '../../preregistration/PreRegistrationView';
import UnscrollableTitleList from '../../../components/shared/UnscrollableTitleList';

const HomeView = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title="World Cinema?" />;
  }

  return (
    <CustomPage
      pageName="For Me"
      titleInitialOpacity={1}
      animationMultiplier={0.7}>
      <View style={{marginBottom: Theme.spacing.columnGap}}>
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
      <View style={{gap: 12, paddingVertical: 8}}>
        <DelayedComponent delay={100}>
          <UnscrollableTitleList
            title="Title-1"
            titles={popularTitles.slice(4, 20)}
          />
        </DelayedComponent>
        {/* <DelayedComponent delay={400}>
          <KeepEnjoying />
        </DelayedComponent> */}
        <DelayedComponent delay={500}>
          <UnscrollableTitleList
            title="Title-2"
            titles={nowPlayMovies.slice(2, 18)}
          />
        </DelayedComponent>
        <DelayedComponent delay={600}>
          <NewComers />
        </DelayedComponent>

        <DelayedComponent delay={700}>
          <UnscrollableTitleList
            title="Title-3"
            titles={popularTitles.concat(popularTitles.slice(0, 12))}
          />
        </DelayedComponent>
        <DelayedComponent delay={800}>
          <TopChoices />
        </DelayedComponent>

        <DelayedComponent delay={900}>
          <UnscrollableTitleList
            title="Title-4"
            titles={topMovies.concat(topMovies.slice(0, 12))}
          />
        </DelayedComponent>
        <DelayedComponent delay={1000}>
          <OnlyHere />
        </DelayedComponent>
      </View>
    </CustomPage>
  );
};

export default HomeView;

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
          gap: Theme.spacing.columnGap,
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

type DelayedComponentProps = {
  delay: number;
  children: React.ReactNode;
};

export const DelayedComponent = (props: DelayedComponentProps) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, props.delay);
  }, []);
  return <>{loading ? null : props.children}</>;
};
