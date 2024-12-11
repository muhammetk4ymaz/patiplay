import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Avatar} from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatsCard from '../../../../components/shared/Cards/StatsCard';
import CustomPage from '../../../../components/shared/CustomPage';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import {Theme} from '../../../../utils/theme';
import DeviceInfo from 'react-native-device-info';
import AddToMyNetworkButton from '../../../../components/shared/Buttons/AddToMyNetworkButton';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import NavigableListSection from '../../../../components/shared/NavigableListSection ';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import networkService from '../../../../helpers/networkService';
import nowPlayMovies from '../../../../models/now_play_movies';
import TopMovie from '../../../../models/top_movie';
import {RootStackParamList} from '../../../../navigation/routes';
import {characterLimited} from '../../profile/favorite_companies';
import ScrollableRow from '../../../../components/shared/ScrollableRow';
import ListHeaderText from '../../../../components/shared/Texts/ListHeaderText';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import FastImage from 'react-native-fast-image';

const SPACING = 8;

const {height, width} = Dimensions.get('window');

type Props = {};

type RouteParams = {
  Cinephiles: {
    username: string;
  };
};

const CinephilesDetailView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Cinephiles'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    console.log(route.params.username);
  }, []);

  const [loading, setLoading] = React.useState(true);

  const [cinephilesData, setCinephilesData] = React.useState<any>({});

  const fetchCinephilesData = async () => {
    try {
      const response = await networkService.post('title/api/cinephiles-b2c/', {
        name: route.params.username,
      });

      if (response.status === 200) {
        console.log('Response Cinephiles', response.data);

        if (response.data.status === 'b2b') {
          navigation.navigate('ProfileRoute');
        } else {
          setCinephilesData(response.data);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCinephilesData();
  }, []);

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
    <CustomPage
      titleCenter={true}
      pageName="Details"
      animationMultiplier={0.25}
      titleInitialOpacity={1}
      isBackButton={true}>
      <View style={{gap: SPACING + 2}}>
        <ProfileHeader
          item={{
            image: cinephilesData.user.image,
            nameSurname:
              cinephilesData.user.name + ' ' + cinephilesData.user.surname,
            username: cinephilesData.user.username,
          }}
        />

        <ProfileInformation
          followerCount={cinephilesData.follower_count}
          myNetworkCount={cinephilesData.my_network_count}
        />
        <StatsSection items={cinephilesData.user_array} />
        <View style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
          <AddToMyNetworkButton
            initialValue={cinephilesData.in_network}
            uuid={route.params.username}
            endpoint="cinephiles-network"
          />
        </View>
        <FavoriteTitles titles={cinephilesData.favorite_title} />
        <FavoriteCompaines companies={cinephilesData.companies} />
        <FavoriteActors actors={cinephilesData.actors} />
        <FavoriteCrewMembers crewMembers={cinephilesData.crew} />
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
    fontWeight: '400',
  },
  descriptionText: {
    color: 'white',
    fontSize: 13,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.columnGap,
    rowGap: SPACING,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
});

type ProfileHeaderProps = {
  item: {
    image: string;
    nameSurname: string;
    username: string;
  };
};

const ProfileHeader = (props: ProfileHeaderProps) => {
  return (
    <View style={styles.header}>
      <ProfileBackground />
      <ProfileAvatar
        image={
          props.item.image
            ? {
                uri: props.item.image,
              }
            : ImageManager.IMAGE_NAMES.MANAVATAR
        }
        nameSurname={props.item.nameSurname}
        username={'@' + props.item.username}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
        <CustomText text={props.username} style={styles.username} />
      </View>
    </View>
  );
};

type ProfileInformationProps = {
  followerCount: number;
  myNetworkCount: number;
};

const ProfileInformation = (props: ProfileInformationProps) => {
  return (
    <View style={{gap: SPACING}}>
      <CustomText
        text={`${props.followerCount} Followings • ${props.myNetworkCount} in My Network`}
        // text="113 Followings • 1.4K in My Network"
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

type StatsSectionProps = {
  items: {key: string; value: string}[];
};

const StatsSection = (props: StatsSectionProps) => {
  React.useEffect(() => {
    console.log('Stats', props.items);
  }, []);
  return (
    <View style={styles.stats}>
      <StatsCard
        title={'Titles\nEnjoyed'}
        value={props.items[0].value}
        // value={
        //   props.items.find(item => item.key === 'Titles Enjoyed')?.value || '0'
        // }
      />

      <StatsCard
        title={'Titles\nCompleted'}
        value={props.items[1].value.slice(0, -1).split('.')[0] + '%'}
        // value={
        //   props.items.find(item => item.key === 'Completed Enjoyed')?.value ||
        //   '0'
        // }
      />
      <StatsCard
        title={'Missions\nCompleted'}
        value={props.items[2].value}
        // value={
        //   props.items.find(item => item.key === 'Missions Complated')?.value ||
        //   '0'
        // }
      />
      <StatsCard
        title={`among\n${characterLimited(
          props.items
            .find(item => item.key.includes('among'))
            ?.key.replace('among ', '') || '',
          10,
        )}`}
        value={props.items[3].value.slice(0, -2)}
        supText={props.items[3].value.slice(-2)}
        // value={
        //   props.items
        //     .find(item => item.key.includes('among'))
        //     ?.value.slice(0, -2) || '0'
        // }
        // supText={props.items
        //   .find(item => item.key.includes('among'))
        //   ?.value.slice(-2)}
      />
      <StatsCard
        title={`in\n${characterLimited(
          props.items[4].key.replace('in ', ''),
          10,
        )}`}
        value={props.items[4].value.slice(0, -2)}
        supText={props.items[4].value.slice(-2)}
      />
      <StatsCard
        title={`in\n${characterLimited(
          props.items[5].key.replace('in ', ''),
          10,
        )}`}
        value={props.items[5].value.slice(0, -2)}
        supText={props.items[5].value.slice(-2)}
      />
      <StatsCard
        title={`in\n${characterLimited(
          props.items[6].key.replace('in ', ''),
          10,
        )}`}
        value={props.items[6].value.slice(0, -2)}
        supText={props.items[6].value.slice(-2)}
      />
      <StatsCard
        title={'in the\nWorld'}
        value={props.items[7].value.slice(0, -2)}
        supText={props.items[7].value.slice(-2)}
      />
    </View>
  );
};

type FavoriteTitlesProps = {
  titles: any[];
};

const FavoriteTitles = (props: FavoriteTitlesProps) => {
  return (
    <View style={{gap: 8}}>
      <CustomText
        text={'Favorite Titles'}
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.md,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="medium"
      />
      <ScrollableRow
        data={props.titles}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                width: calculateGridItemWidth(3.5),
                aspectRatio: Theme.aspectRatios.vertical,
                borderRadius: Theme.titlePosterRadius,
                justifyContent: 'flex-end',
              }}>
              <FastImage
                source={{
                  uri: item.verticalPhotos[0].url,
                }}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    borderRadius: Theme.titlePosterRadius,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
        initialNumToRender={4}
      />
    </View>
  );
};

type FavoriteCompainesProps = {
  companies: any[];
};

const FavoriteCompaines = (props: FavoriteCompainesProps) => {
  return (
    <View style={{gap: 8}}>
      <CustomText
        text={'Favorite Companies'}
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.md,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="medium"
      />
      <ScrollableRow
        data={props.companies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <CircularAvatar
              imagePath={
                item.logo
                  ? {
                      uri: item.logo,
                    }
                  : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
              }
            />
          );
        }}
        initialNumToRender={4}
      />
    </View>
  );
};

type FavoriteActorsProps = {
  actors: any[];
};

const FavoriteActors = (props: FavoriteActorsProps) => {
  return (
    <View style={{gap: 8}}>
      <CustomText
        text={'Favorite Actors & Actresses'}
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.md,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="medium"
      />
      <ScrollableRow
        data={props.actors}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <CircularAvatar
              imagePath={
                item.image
                  ? {
                      uri: item.image,
                    }
                  : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
              }
            />
          );
        }}
        initialNumToRender={4}
      />
    </View>
  );
};

type FavoriteCrewMembersProps = {
  crewMembers: any[];
};

const FavoriteCrewMembers = (props: FavoriteCrewMembersProps) => {
  return (
    <View style={{gap: 8}}>
      <CustomText
        text={'Favorite Crew Members'}
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.md,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="medium"
      />
      <ScrollableRow
        data={props.crewMembers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <CircularAvatar
              imagePath={
                item.image
                  ? {
                      uri: item.image,
                    }
                  : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
              }
            />
          );
        }}
        initialNumToRender={4}
      />
    </View>
  );
};
