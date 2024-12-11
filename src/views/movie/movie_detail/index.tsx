import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomTextButton from '../../../components/shared/Buttons/CustomTextButton';
import CustomText from '../../../components/shared/CustomText';
import {Theme} from '../../../utils/theme';

import {reactions} from '../../../components/shared/Comment/Comment';
import DynamicTabBar from '../../../components/shared/DynamicTabBar/DynamicTabBar';
import {AddFavoriteInteractionButton} from '../../../components/shared/InteractionButtons/AddFavoriteInteractionButton';
import {AddWatchListInteractionButton} from '../../../components/shared/InteractionButtons/AddWatchListInteractionButton';
import {GetNotificationsInteractionButton} from '../../../components/shared/InteractionButtons/GetNotificationsInteractionButton';
import {LikeInteractionButton} from '../../../components/shared/InteractionButtons/LikeInteractionButton';
import {ImageManager} from '../../../constants/ImageManager';
import networkService from '../../../helpers/networkService';
import {RootStackParamList} from '../../../navigation/routes';
import TrailerEditor from './components/TrailerEditor';
import TitleCastTab from './tabs/TitleCastTab';
import TitleClipsTab from './tabs/TitleClipsTab';
import TitleCommentsTab from './tabs/TitleCommentsTab';
import TitleCrewTab from './tabs/TitleCrewTab';
import TitleDiscussionsTab from './tabs/TitleDiscussionsTab';
import TitleEpisodesTab from './tabs/TitleEpisodesTab';
import TitleFansTab from './tabs/TitleFansTab';
import TitleLanguagesTab from './tabs/TitleLanguagesTab';
import TitleListsTab from './tabs/TitleListsTab';
import TitleRecommendationsTab from './tabs/TitleRecommendationsTab';
import TitleRelatedTab from './tabs/TitleRelatedTab';
import TitleTrailersTab from './tabs/TitleTrailersTab';
import ReactionToggleComponent from '../../../components/shared/ReactionToggleComponent';
import {AddMyListIntereactionButton} from '../../../components/shared/InteractionButtons/AddMyListIntereactionButton';
import {GiftInteractionButton} from '../../../components/shared/InteractionButtons/GiftInteractionButton';
import {ShareInteractionButton} from '../../../components/shared/InteractionButtons/ShareInteractionButton';

type RouteParams = {
  MovieDetail: {
    movieId: string;
  };
};

const MovieDetailView = () => {
  const route = useRoute<RouteProp<RouteParams, 'MovieDetail'>>();
  const movieId = route.params.movieId;
  const [movie, setMovie] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const uuid = 'e1e2ed55-c705-45e5-a5f3-f0553a5bb910';
  // const uuid = 'dd1d40cb-9011-4bdd-9318-4df0efb44cf1';
  React.useEffect(() => {
    console.log('Rendered MovieDetailView');

    const fetchTitleData = async () => {
      try {
        const response = await networkService.post('title/api/title-movie/', {
          slug: uuid,
        });
        console.log(response.data);
        setMovie(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);

            switch (error.response.status) {
              case 400:
                console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');
                setError('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

                break;
              case 401:
                console.log(
                  'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
                );
                setError(
                  'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
                );

                break;
              case 500:
                console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
                setError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

                break;
              default:
                console.log(
                  'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
                );
                setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
            }
          } else if (error.request) {
            console.log(error.request);
            console.log(
              'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
            );
            setError(
              'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
            );
          } else {
            console.log('Error', error.message);
            console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
          }
        } else {
          console.log('Error', error);
          console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
          setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTitleData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Theme.colors.background,
        }}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Theme.colors.background,
        }}>
        <CustomText text={error} />
      </View>
    );
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={false}
      ref={scrollViewRef}
      style={{flex: 1, backgroundColor: 'black'}}>
      <MovieSection movie={movie} />
      <View style={{minHeight: Dimensions.get('window').height * 0.5}}>
        <DynamicTabBar
          components={[
            <TitleEpisodesTab uuid={uuid} />,
            <TitleClipsTab uuid={uuid} />,
            <TitleTrailersTab uuid={uuid} />,
            <TitleCommentsTab uuid={uuid} />,
            <TitleDiscussionsTab uuid={uuid} />,
            <TitleRecommendationsTab uuid={uuid} />,
            <TitleListsTab uuid={uuid} />,
            <TitleFansTab uuid={uuid} />,
            <TitleCastTab uuid={uuid} />,
            <TitleCrewTab crewData={movie.title.occupation} />,
            <TitleLanguagesTab
              dubLanguages={movie.title.dub_language}
              subLanguages={movie.title.sub_language}
            />,
            <TitleRelatedTab uuid={uuid} />,
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetailView;

type MovieSectionProps = {
  movie: any;
};

const MovieSection = (props: MovieSectionProps) => {
  return (
    <View
      style={{
        backgroundColor: Theme.colors.background,
        paddingBottom: 12,
        width: '100%',
      }}>
      <TrailerEditor
        backdropPath={
          props.movie.title.horizontalPhotos[0].url
            ? {uri: props.movie.title.horizontalPhotos[0].url}
            : ImageManager.IMAGE_NAMES.PATOHORIZONTALLOGOWHITE
        }
      />
      <MovieInfo movie={props.movie.title} />
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.columnGap,
        }}>
        <CustomText
          text={
            'Marvel is committed to bringing great stories, characters, and experiences to fans all over the world. We strive to foster an inclusive, diverse, respectful, and safe environment for all of our fans, and we ask the same of our fan communities. As such, we reserve the right to take action including but not limited to hiding, deleting, blocking, and reporting any posts on this account or page.'
          }
          style={styles.movieOverview}
          weight="medium"
        />
      </View>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          marginTop: Theme.spacing.columnGap,
          flexDirection: 'row',
          gap: 5,
        }}>
        <LikeInteractionButton
          initialValue={props.movie.button_status.like}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
        <ReactionToggleComponent
          initialValue={reactions.find(
            reaction =>
              reaction.name.toLocaleLowerCase() ===
              props.movie.button_status.react?.toLowerCase(),
          )}
          iconSize={Theme.iconSizes.interactionIcon}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
        <AddFavoriteInteractionButton
          endpoint="title-b2c"
          initialValue={props.movie.button_status.favorite}
          uuid={props.movie.title.uuid}
        />
        <AddWatchListInteractionButton
          initialValue={props.movie.button_status.watchlist}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
        <AddMyListIntereactionButton
          initialValue={props.movie.button_status.list}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
        <GetNotificationsInteractionButton
          initialValue={props.movie.button_status.notifications}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
        <GiftInteractionButton
          initialValue={props.movie.button_status.notifications}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
        <ShareInteractionButton
          initialValue={props.movie.button_status.notifications}
          uuid={props.movie.title.uuid}
          endpoint="title-b2c"
        />
      </View>
    </View>
  );
};

const EnjoyButton = React.memo((props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <CustomTextButton
      text="Enjoy"
      onPress={() => {
        navigation.navigate('Movie');
      }}
      borderRadius={36}
      textColor="black"
      backgroundColor={Theme.colors.white}
    />
  );
});

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  categoryText: {
    color: Theme.colors.gray,
    fontSize: Theme.fontSizes.xs,
  },
  categorySeperator: {
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Theme.colors.gray,
    width: 3,
    height: 3,
    borderRadius: 3,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  movieOverview: {
    color: Theme.colors.gray,
    fontSize: Theme.fontSizes.sm,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.gray,
  },
  requestButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: 12,
  },
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
});

type MovieInfoProps = {
  movie: any;
};

const MovieInfo = (props: MovieInfoProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const CategoryText = (props: any) => {
    return (
      <CustomText
        text={props.category}
        style={styles.categoryText}
        ellipsizeMode="tail"
        numberOfLines={1}
        weight="medium"
      />
    );
  };
  const tags = [
    new Date(props.movie.startDate).getFullYear(),
    formatDuration(props.movie.total_time),
    props.movie.filmAge.value,
  ];
  return (
    <View
      style={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        // marginTop: (420 - 260 - headerHeight) * -1,
        paddingVertical: Theme.spacing.columnGap,
        gap: Theme.spacing.columnGap + 2,
      }}>
      <View>
        <View style={styles.categoryContainer}>
          {props.movie.genres.map((genre: any, index: any) => (
            <View key={index} style={styles.categoryContent}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Genre', genre);
                  navigation.navigate('Genres', {
                    slug: genre.genre.toLowerCase(),
                  });
                }}>
                <CategoryText category={genre.genre} />
              </TouchableOpacity>
              {index !== props.movie.genres.length - 1 && (
                <View style={styles.categorySeperator}></View>
              )}
            </View>
          ))}
        </View>
        <View style={{gap: 5}}>
          <CustomText
            text={props.movie.title[0].title}
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.lg,
            }}
            weight="bold"
          />
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
            }}>
            <TouchableOpacity
              key={'tag-0'}
              onPress={() => {
                navigation.navigate('ReleaseDates', {year: tags[0].toString()});
              }}>
              <View style={styles.tag}>
                <CustomText
                  text={tags[0]}
                  style={{color: Theme.colors.white}}
                  weight="medium"
                />
              </View>
            </TouchableOpacity>

            <View style={styles.tag} key={'tag-1'}>
              <CustomText
                text={tags[1]}
                style={{color: Theme.colors.white}}
                weight="medium"
              />
            </View>

            <View style={styles.tag} key={'tag-2'}>
              <CustomText
                text={tags[2]}
                style={{color: Theme.colors.white}}
                weight="medium"
              />
            </View>
          </View>
        </View>
      </View>
      <EnjoyButton />
    </View>
  );
};

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }

  if (hours === 0 || minutes === 0) {
    if (remainingSeconds !== 0) {
      formattedTime += `${remainingSeconds}s`;
    }
  }

  return formattedTime.trim();
}
