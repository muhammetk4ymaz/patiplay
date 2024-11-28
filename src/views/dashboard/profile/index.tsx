import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import CustomText from '../../../components/shared/CustomText';
import {Theme} from '../../../constants/Theme';
import {Avatar} from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import MenuItemComponent, {MenuItem} from './components/MenuItem';

import React from 'react';
import {useTranslation} from 'react-i18next';
import '../../../i18n';
import DeviceInfo from 'react-native-device-info';
import nowPlayMovies from '../../../models/now_play_movies';
import {ImageManager} from '../../../constants/ImageManager';
import LinearGradient from 'react-native-linear-gradient';
import CustomPage from '../../../components/shared/CustomPage';
import {useHeaderHeight} from '@react-navigation/elements';
import ProgressIndicator from '../../../components/shared/ProgressIndicator';
import VerticalPoster from '../../../components/shared/VerticalPoster';
import BiographyCard from '../../../components/shared/Cards/BiographyCard';
import ViewingStats from '../../../components/shared/CustomComponents/ViewingStats';
import ScrollableRow from '../../../components/shared/ScrollableRow';
import TopMovie from '../../../models/top_movie';
import NavigableListSection from '../../../components/shared/NavigableListSection ';
import TitleWithProgress from '../../../components/shared/CustomComponents/TitleWithProgress';
import WatchHistoryItem from './components/WatchHistoryItem';
import CircularAvatar from '../../../components/shared/CircularAvatar';
import {RootStackParamList} from '../../../navigation/routes';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import PreRegistrationView from '../../preregistration/PreRegistrationView';

const {height, width} = Dimensions.get('window');

const SPACING = 8;

const ProfileView = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'You?'} />;
  }

  return (
    <CustomPage
      pageName="My Profile"
      animationMultiplier={0.4}
      titleInitialOpacity={1}>
      <View style={{gap: SPACING + 2}}>
        <ProfileHeader />
        <ProfileInformation />
        <BiographySection />
        <ViewingStats
          info={'I’ve enjoyed\n21 of 243 countries'}
          percentage={8}
        />
        <MyFavorites />
        <FavoriteCompaines />
        <FavoriteActors />
        <FavoriteCrewMembers />
        <ProfileMenu />
        <WatchHistories />
      </View>
    </CustomPage>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.background,
    gap: SPACING,
  },
  contentContainerStyle: {
    gap: SPACING + 2,
    paddingBottom: 12,
  },

  biography: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.rowGap,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
  header: {
    height: height * 0.4,
    width: width,
  },
  followingsText: {
    color: 'white',
    fontSize: Theme.fontSizes.sm,
    textAlign: 'center',
  },
  descriptionText: {
    color: 'white',
    fontSize: 13,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
  background: {
    height: height * 0.4,
    width: width,
  },
  linearGradient: {
    height: height * 0.4,
    width: width,
    position: 'absolute',
  },
  avatarContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: SPACING / 2,
  },
  name: {
    color: 'white',
    fontSize: Theme.fontSizes.lg,
  },
  username: {
    color: 'white',
    opacity: 0.5,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '200',
  },

  favoriteTitles: {},
  favoriteCompanies: {},
  favoriteActors: {},
  favoriteCrewMembers: {},
  profileMenu: {},
});

const ProfileHeader = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.header}>
      <ProfileBackground />
      <TouchableOpacity
        style={{
          position: 'absolute',
          padding: 12,
          right: 0,
          top: headerHeight,
        }}>
        <IconMaterialCommunityIcons
          name="square-edit-outline"
          size={Theme.iconSize}
          color={Theme.colors.white}
          style={{padding: 12}}
        />
      </TouchableOpacity>
      <ProfileAvatar />
    </View>
  );
};

const ProfileInformation = () => {
  return (
    <View style={{gap: SPACING}}>
      <CustomText
        text="113 Followings • 1.4K in My Network"
        style={styles.followingsText}
      />
      <CustomText
        text="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
        style={styles.descriptionText}
        weight="light"
      />
    </View>
  );
};

const ProfileBackground = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={ImageManager.IMAGE_NAMES.PROFİLEBACKGROUND}
        style={[styles.background, StyleSheet.absoluteFillObject]}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        style={styles.linearGradient}
      />
    </View>
  );
};

const ProfileAvatar = () => {
  return (
    <View style={styles.avatarContainer}>
      <Avatar
        size={'2xl'}
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/009/398/577/non_2x/man-avatar-clipart-illustration-free-png.png',
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText text="Muhammet Kaymaz" weight="bold" style={styles.name} />
        <CustomText text="@muhammetk4ymaz" style={styles.username} />
      </View>
    </View>
  );
};

const BiographySection = () => {
  return (
    <View style={styles.biography}>
      <BiographyCard title={'Titles\nEnjoyed'} value="214" />
      <BiographyCard title={'Titles\nCompleted'} value="52%" />
      <BiographyCard title={'Missions\nCompleted'} value="467" />
      <BiographyCard
        title={`among\n${
          'Software Engineers'.length > 10
            ? 'Software Engineers'.substring(0, 10) + '...'
            : 'Software Engineers'
        }`}
        value="21"
        supText="st"
      />
      <BiographyCard
        title={`in\n${
          'Borussia Mönchengladbach'.length > 10
            ? 'Borussia Mönchengladbach'.substring(0, 10) + '...'
            : 'Borussia Mönchengladbach'
        }`}
        value="42"
        supText="nd"
      />
      <BiographyCard
        title={`in\n${
          'Istanbul'.length > 10
            ? 'Istanbul'.substring(0, 10) + '...'
            : 'Istanbul'
        }`}
        value="143"
        supText="rd"
      />
      <BiographyCard
        title={`in\n${
          'United Kingdom'.length > 10
            ? 'United Kingdom'.substring(0, 10) + '...'
            : 'United Kingdom'
        }`}
        value="4.1K"
        supText="th"
      />
      <BiographyCard title={'in the\nWorld'} value="11.2M" supText="th" />
    </View>
  );
};

const MyFavorites = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="My Favorites"
      pressHandler={() => {
        navigation.navigate('MyFavorites');
      }}
      data={nowPlayMovies}
      initialNumToRender={4}
      renderItem={({item}: {item: TopMovie}) => (
        <VerticalPoster
          posterPath={item.poster_path}
          width={DeviceInfo.isTablet() ? width / 6 : (width - 36) / 3.5}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const FavoriteCompaines = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorite Companies"
      pressHandler={() => {
        navigation.navigate('FavoriteCompanies');
      }}
      data={nowPlayMovies}
      initialNumToRender={6}
      renderItem={({item}: {item: TopMovie}) => (
        <CircularAvatar
          imagePath={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const FavoriteActors = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorite Actors & Actresses"
      pressHandler={() => {
        navigation.navigate('FavoriteActors');
      }}
      data={nowPlayMovies}
      initialNumToRender={6}
      renderItem={({item}: {item: TopMovie}) => (
        <CircularAvatar
          imagePath={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const FavoriteCrewMembers = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorite Crew Members"
      data={nowPlayMovies}
      pressHandler={() => {
        navigation.navigate('FavoriteCrew');
      }}
      initialNumToRender={6}
      renderItem={({item}: {item: TopMovie}) => (
        <CircularAvatar
          imagePath={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const WatchHistories = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Watch History"
      data={nowPlayMovies}
      pressHandler={() => {
        navigation.navigate('WatchHistory');
      }}
      initialNumToRender={3}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}: {item: TopMovie}) => (
        <WatchHistoryItem
          backdropPath={item.backdrop_path}
          title={item.title}
          type={
            item.id % 4 === 0
              ? 'movie'
              : item.id % 4 === 1
              ? 'clip'
              : item.id % 4 === 2
              ? 'episode'
              : 'trailer'
          }
        />
      )}
    />
  );
};

const ProfileMenu = React.memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {t} = useTranslation();

  const menuItems2: MenuItem[] = [
    {
      title: 'My Network',
      icon: (
        <IconMaterialCommunityIcons
          name="account-group"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {
        navigation.navigate('MyNetwork');
      },
    },
    {
      title: 'My Followings',
      icon: (
        <IconMaterialCommunityIcons
          name="account-multiple"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {
        navigation.navigate('MyFollowings');
      },
    },
    {
      title: 'My Watchlist',
      icon: (
        <IconMaterialCommunityIcons
          name="playlist-edit"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {
        navigation.navigate('MyWatchlist');
      },
    },
    {
      title: 'My Reports',
      icon: (
        <IconMaterialCommunityIcons
          name="file-chart"
          size={Theme.menuIconSize}
          color={'white'}
        />
      ),
      onPress: () => {},
    },
  ];
  return (
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      {menuItems2.map((item, index) => {
        return <MenuItemComponent menuItem={item} key={index} />;
      })}
    </View>
  );
});
