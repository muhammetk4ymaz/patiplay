import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Theme} from '../../../constants/Theme';
import MainTitleCarousel from './components/MainTitleCarousel';
import {GlobeIcon} from '../../../../assets/icons';
import FlagComponent from '../../../components/shared/FlagComponent';
import nowPlayMovies from '../../../models/now_play_movies';
import upComingTitles from '../../../models/upcoming';
import popularTitles from '../../../models/popular';
import UnscrollableList from './components/UnscrollableList';
import CustomPage from '../../../components/shared/CustomPage';
import LinearGradient from 'react-native-linear-gradient';
import ListHeaderText from '../../../components/shared/ListHeaderText';
import TopMovie from '../../../models/top_movie';
import KeepEnjoyingItem from '../../../components/shared/CustomComponents/KeepEnjoyingItem';
import NewcomersItem from '../../../components/shared/CustomComponents/NewcomersItem';
import TopChoicesItem from '../../../components/shared/CustomComponents/TopChoicesItem';
import OnlyHereItem from '../../../components/shared/CustomComponents/OnlyHereItem';
import TitleCarousel from '../../../components/shared/TitleCarousel';
import VerticalPoster from '../../../components/shared/VerticalPoster';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/routes';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import CustomText from '../../../components/shared/CustomText';
import {useHeaderHeight} from '@react-navigation/elements';
import CustomTextButton from '../../../components/shared/CustomTextButton';
import SocialButton from '../../../components/shared/SocialButton';
import IconIonicons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import PreRegistrationView from '../../preregistration/PreRegistrationView';

const HomeView = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const headerHeight = useHeaderHeight();

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
      <TitlesLists />

      {/* <View style={{gap: 12, paddingVertical: 8}}>
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
      </View> */}
    </CustomPage>
  );
};

export default HomeView;

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

export const FlagList = React.memo(() => {
  const flags = ['Us', 'Tr', 'Br', 'De', 'Cn', 'Gb', 'Tr', 'Br', 'De'];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: Theme.paddings.viewHorizontalPadding,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Countries');
        }}
        style={{
          alignSelf: 'center',
        }}>
        <GlobeIcon size={45} />
      </TouchableOpacity>
      <View
        style={{
          marginVertical: 12,
          width: 1.5,
          height: 'auto',
          backgroundColor: 'gray',
          marginLeft: 5,
        }}
      />
      <FlatList
        horizontal
        nestedScrollEnabled
        keyExtractor={(item, index) => `flagitem-${index}`}
        contentContainerStyle={{
          gap: 5,
          paddingRight: 18,
          paddingLeft: 5,
          paddingVertical: 12,
        }}
        data={flags}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <FlagComponent isoCode={item} width={45} height={45} />
        )}
      />
    </View>
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
  // <UnscrollableList title="Title-2" titles={nowPlayMovies.slice(2, 18)} />,
  <NewComers />,
  // <UnscrollableList
  //   title="Title-3"
  //   titles={popularTitles.concat(popularTitles.slice(0, 12))}
  // />,
  <TopChoices />,
  // <UnscrollableList
  //   title="Title-4"
  //   titles={topMovies.concat(topMovies.slice(0, 12))}
  // />,
  <OnlyHere />,
];
