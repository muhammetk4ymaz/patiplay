import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomPage from '../../../../components/shared/CustomPage';
import {useHeaderHeight} from '@react-navigation/elements';
import {Theme} from '../../../../constants/Theme';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageManager} from '../../../../constants/ImageManager';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../components/shared/CustomText';
import {Avatar} from 'native-base';
import BiographyCard from '../../../../components/shared/Cards/BiographyCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import NavigableListSection from '../../../../components/shared/NavigableListSection ';
import nowPlayMovies from '../../../../models/now_play_movies';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import DeviceInfo from 'react-native-device-info';
import TopMovie from '../../../../models/top_movie';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import {RootStackParamList} from '../../../../navigation/routes';

const SPACING = 8;

const {height, width} = Dimensions.get('window');

type Props = {};

const CinephilesDetailView = (props: Props) => {
  return (
    <CustomPage
      pageName="Details"
      animationMultiplier={0.25}
      titleInitialOpacity={1}
      isBackButton={true}>
      <View style={{gap: SPACING + 2}}>
        <ProfileHeader />
        <ProfileInformation />
        {/* <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          }}>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Avatar.Group
              style={{
                paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              }}
              _avatar={{
                size: 7,
              }}
              max={3}>
              <Avatar
                bg="green.500"
                borderWidth={0}
                zIndex={1}
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}></Avatar>
              <Avatar
                bg="cyan.500"
                borderWidth={0}
                zIndex={0}
                left={-8}
                source={{
                  uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                }}></Avatar>
            </Avatar.Group>
          </View>
        </View> */}
        <BiographySection />
        <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              colors={['#8b5cf6', '#a855f7']} // from violet-500 to purple-500
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 36,
              }}>
              <CustomText
                text="Add to My Network"
                style={{
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                  textAlign: 'center',
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <FavoriteTitles />
        <FavoriteCompaines />
        <FavoriteActors />
        <FavoriteCrewMembers />
      </View>
    </CustomPage>
  );
};

export default CinephilesDetailView;

const styles = StyleSheet.create({
  header: {
    height: height * 0.4,
    width: width,
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
  biography: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.rowGap,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
});

const ProfileHeader = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.header}>
      <ProfileBackground />
      <ProfileAvatar />
    </View>
  );
};

const ProfileBackground = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={ImageManager.IMAGE_NAMES.PROFİLEBACKGROUND2}
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
        <CustomText text="Emre Güngör" weight="bold" style={styles.name} />
        <CustomText text="@emregungor" style={styles.username} />
      </View>
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

const FavoriteTitles = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <NavigableListSection
      title="Favorites"
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
