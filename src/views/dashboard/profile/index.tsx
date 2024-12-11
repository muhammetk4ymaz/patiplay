import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar} from 'native-base';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/shared/CustomText';
import {Theme} from '../../../utils/theme';
import MenuItemComponent, {MenuItem} from './components/MenuItem';
import {useHeaderHeight} from '@react-navigation/elements';
import React from 'react';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import StatsCard from '../../../components/shared/Cards/StatsCard';
import CircularAvatar from '../../../components/shared/CircularAvatar';
import ViewingStats from '../../../components/shared/CustomComponents/ViewingStats';
import CustomPage from '../../../components/shared/CustomPage';
import NavigableListSection from '../../../components/shared/NavigableListSection ';
import VerticalPoster from '../../../components/shared/VerticalPoster';
import {ImageManager} from '../../../constants/ImageManager';
import '../../../i18n';
import nowPlayMovies from '../../../models/now_play_movies';
import TopMovie from '../../../models/top_movie';
import {RootStackParamList} from '../../../navigation/routes';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import PreRegistrationView from '../../preregistration/PreRegistrationView';
import WatchHistoryItem from './components/WatchHistoryItem';
import networkService from '../../../helpers/networkService';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {calculateGridItemWidth} from '../../../utils/calculateGridItemWidth';

const {height, width} = Dimensions.get('window');

const SPACING = 8;

const ProfileView = () => {
  const [loading, setLoading] = React.useState(true);

  const [userData, setUserData] = React.useState<any>({});

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'You?'} />;
  }

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await networkService.get(
          'title/api/user-profile-view/',
        );
        console.log(response.data);
        setUserData(response.data);
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
    if (isAuthenticated) {
      fetchUserData();
    }
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
      pageName="My Profile"
      animationMultiplier={0.4}
      titleInitialOpacity={1}>
      <View style={{gap: SPACING + 2}}>
        <ProfileHeader
          item={{
            image: ImageManager.IMAGE_NAMES.MANAVATAR,
            nameSurname: userData.data.name_surname,
            username: userData.data.username,
          }}
        />
        <ProfileInformation
          description="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
          followings={userData.follower_count}
          network={userData.network}
        />
        <StatsSection />
        <ViewingStats
          info={'I’ve enjoyed\n21 of 243 countries'}
          percentage={8}
        />
        <MyFavorites favorites={userData.title} />
        <FavoriteCompaines companies={userData.company} />
        <FavoriteActors actors={userData.actor} />
        <FavoriteCrewMembers crewMembers={userData.crew} />
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

  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.columnGap,
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
    fontWeight: '400',
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

type ProfileHeaderProps = {
  item: {
    image: ImageSourcePropType;
    nameSurname: string;
    username: string;
  };
};

const ProfileHeader = (props: ProfileHeaderProps) => {
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
      <ProfileAvatar
        image={props.item.image}
        nameSurname={props.item.nameSurname}
        username={props.item.username}
      />
    </View>
  );
};

type ProfileInformationProps = {
  followings: number;
  network: number;
  description: string;
};

const ProfileInformation = (props: ProfileInformationProps) => {
  return (
    <View style={{gap: SPACING}}>
      <CustomText
        text={`${props.followings} Followings • ${props.network} in My Network`}
        // text="113 Followings • 1.4K in My Network"
        style={styles.followingsText}
      />
      <CustomText
        text={props.description}
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

type ProfileAvatarProps = {
  image: ImageSourcePropType;
  nameSurname: string;
  username: string;
};

const ProfileAvatar = (props: ProfileAvatarProps) => {
  return (
    <View style={styles.avatarContainer}>
      <Avatar
        size={'2xl'}
        source={props.image}
        backgroundColor={'transparent'}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          text={props.nameSurname}
          weight="bold"
          style={styles.name}
        />
        <CustomText text={'@' + props.username} style={styles.username} />
      </View>
    </View>
  );
};

const StatsSection = () => {
  return (
    <View style={styles.stats}>
      <StatsCard title={'Titles\nEnjoyed'} value="214" />
      <StatsCard title={'Titles\nCompleted'} value="52%" />
      <StatsCard title={'Missions\nCompleted'} value="467" />
      <StatsCard
        title={`among\n${
          'Software Engineers'.length > 10
            ? 'Software Engineers'.substring(0, 10) + '...'
            : 'Software Engineers'
        }`}
        value="21"
        supText="st"
      />
      <StatsCard
        title={`in\n${
          'Borussia Mönchengladbach'.length > 10
            ? 'Borussia Mönchengladbach'.substring(0, 10) + '...'
            : 'Borussia Mönchengladbach'
        }`}
        value="42"
        supText="nd"
      />
      <StatsCard
        title={`in\n${
          'Istanbul'.length > 10
            ? 'Istanbul'.substring(0, 10) + '...'
            : 'Istanbul'
        }`}
        value="143"
        supText="rd"
      />
      <StatsCard
        title={`in\n${
          'United Kingdom'.length > 10
            ? 'United Kingdom'.substring(0, 10) + '...'
            : 'United Kingdom'
        }`}
        value="4.1K"
        supText="th"
      />
      <StatsCard title={'in the\nWorld'} value="11.2M" supText="th" />
    </View>
  );
};

type MyFavoritesProps = {
  favorites: any[];
};

const MyFavorites = (props: MyFavoritesProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="My Favorites"
      pressHandler={() => {
        navigation.navigate('MyFavorites', {data: props.favorites});
      }}
      data={props.favorites}
      initialNumToRender={4}
      renderItem={({item}) => (
        <View
          style={[
            {
              overflow: 'hidden',
              width: calculateGridItemWidth(3.5),
              aspectRatio: 2000 / 3000,
              borderRadius: 12,
            },
          ]}>
          <FastImage
            source={{uri: item.verticalPhotos__0__url}}
            style={[StyleSheet.absoluteFillObject]}
          />
        </View>
      )}
      keyExtractor={item => item.uuid}
    />
  );
};

type FavoriteCompainesProps = {
  companies: any[];
};

const FavoriteCompaines = (props: FavoriteCompainesProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorite Companies"
      pressHandler={() => {
        navigation.navigate('FavoriteCompanies', {data: props.companies});
      }}
      data={props.companies}
      initialNumToRender={6}
      renderItem={({item}) => (
        <CircularAvatar
          imagePath={
            item.logo
              ? {
                  uri: item.logo,
                }
              : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
          }
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

type FavoriteActorsProps = {
  actors: any[];
};

const FavoriteActors = (props: FavoriteActorsProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorite Actors & Actresses"
      pressHandler={() => {
        navigation.navigate('FavoriteActors', {data: props.actors});
      }}
      data={props.actors}
      initialNumToRender={6}
      renderItem={({item}) => (
        <CircularAvatar
          imagePath={
            item.image
              ? {
                  uri: item.image,
                }
              : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
          }
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

type FavoriteCrewMembersProps = {
  crewMembers: any[];
};

const FavoriteCrewMembers = (props: FavoriteCrewMembersProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorite Crew Members"
      data={props.crewMembers}
      pressHandler={() => {
        navigation.navigate('FavoriteCrew', {data: props.crewMembers});
      }}
      initialNumToRender={6}
      renderItem={({item}) => (
        <CircularAvatar
          imagePath={
            item.image
              ? {
                  uri: item.image,
                }
              : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
          }
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
