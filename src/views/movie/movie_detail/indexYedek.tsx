import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomTextButton from '../../../components/shared/Buttons/CustomTextButton';
import CustomText from '../../../components/shared/CustomText';
import Movie from '../../../models/movie';
import {Theme} from '../../../utils/theme';
import Reactions from './components/Reactions';

import popularTitles from '../../../models/popular';
import upComingTitles from '../../../models/upcoming';
import {RootStackParamList} from '../../../navigation/routes';
import {
  setCasts,
  setClips,
  setComments,
  setCrew,
  setDiscussions,
  setFans,
  setLanguages,
  setList,
  setRecommmendaions,
  setRelated,
  setTrailers,
} from '../../../redux/features/titledetail/titleDetailSlice';
import {useAppDispatch} from '../../../redux/hooks';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingWidget from '../../../components/shared/LoadingWidget';

type RouteParams = {
  MovieDetail: {
    movieId: string;
  };
};

const MovieDetailView = () => {
  const route = useRoute<RouteProp<RouteParams, 'MovieDetail'>>();
  const movieId = route.params.movieId;
  const [movie, setMovie] = React.useState<Movie>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const uuid = 'dd1d40cb-9011-4bdd-9318-4df0efb44cf1';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjJiZDMzNWRmNWNmZDdhYzQ2MzNlZGJjMTc0ZjY1ZiIsIm5iZiI6MTcyNTk0OTgwMi41NzAyNTMsInN1YiI6IjY2ZGZlNjY5MDAwMDAwMDAwMDY0MGJkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GB1aK7PWy5JY5gM4IYUGcfDSv9OVf33IBHURWcsn2bo',
        },
      })
      .then(response => {
        console.log(response.data);
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setError('An error occurred');
      });
  }, []);

  if (loading) {
    return <LoadingWidget />;
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

  const Header = () => {
    const [reactionY, setReactionY] = React.useState<number>(0);

    const handleLayout = (event: any) => {
      // Get the 'y' value from the event
      const y = event.nativeEvent.layout.y;
      const x = event.nativeEvent.layout.x;
      console.log(y); // You can log it to see the value

      setReactionY(y); // Update the state with the 'y' value
    };
    return (
      <View
        style={{
          backgroundColor: Theme.colors.background,
          paddingBottom: 12,
          width: '100%',
        }}>
        <TrailerEditor backdropPath={movie!.backdrop_path} />
        <MovieInfo movie={movie!} />
        <View
          style={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: Theme.spacing.columnGap,
          }}>
          <PlayButton />
          <CustomText
            text={movie?.overview || ''}
            style={styles.movieOverview}
            weight="medium"
          />
        </View>
        <View
          style={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            marginTop: Theme.spacing.columnGap,
          }}
          onLayout={event => {
            handleLayout(event);
          }}>
          <Reactions reactionY={reactionY} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'black'}}
      removeClippedSubviews>
      <Header />
      <View style={{minHeight: Dimensions.get('window').height * 0.5}}>
        <TabsView />
      </View>
    </ScrollView>
  );
};

export default MovieDetailView;

const TabsView = () => {
  const dispatch = useAppDispatch();

  let clipClicked = false;
  let trailerClicked = false;
  let commentClicked = false;
  let discussionClicked = false;
  let recommendationClicked = false;
  let listClicked = false;
  let fanClicked = false;
  let castClicked = false;
  let crewClicked = false;
  let languageClicked = false;
  let relatedClicked = false;

  const onChangeTab = (index: number) => {
    setActiveTab(index);
    tabBarScrollRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
    switch (index) {
      case 0:
        break;

      case 1:
        if (!clipClicked) {
          setTimeout(() => {
            dispatch(setClips(popularTitles));
          }, 0);
          clipClicked = true;
        }
        break;

      case 2:
        if (!trailerClicked) {
          setTimeout(() => {
            dispatch(setTrailers(upComingTitles));
          }, 0);
          trailerClicked = true;
        }
        break;

      case 3:
        if (!commentClicked) {
          setTimeout(() => {
            dispatch(setComments(popularTitles));
          }, 0);
          commentClicked = true;
        }
        break;
      case 4:
        if (!discussionClicked) {
          setTimeout(() => {
            dispatch(setDiscussions(popularTitles));
          }, 500);
          discussionClicked = true;
        }
        break;

      case 5:
        if (!recommendationClicked) {
          setTimeout(() => {
            dispatch(setRecommmendaions(popularTitles));
          }, 0);
          recommendationClicked = true;
        }
        break;

      case 6:
        if (!listClicked) {
          setTimeout(() => {
            dispatch(setList(popularTitles));
          }, 0);
          listClicked = true;
        }
        break;

      case 7:
        if (!fanClicked) {
          setTimeout(() => {
            dispatch(setFans(popularTitles));
          }, 0);
          fanClicked = true;
        }
        break;

      case 8:
        if (!castClicked) {
          setTimeout(() => {
            dispatch(setCasts(popularTitles));
          }, 0);
          castClicked = true;
        }
        break;

      case 9:
        if (!crewClicked) {
          setTimeout(() => {
            dispatch(setCrew(popularTitles));
          }, 0);
          crewClicked = true;
        }
        break;

      case 10:
        if (!languageClicked) {
          setTimeout(() => {
            dispatch(setLanguages(popularTitles));
          }, 0);
          languageClicked = true;
        }
        break;

      case 11:
        if (!relatedClicked) {
          setTimeout(() => {
            dispatch(setRelated(popularTitles));
          }, 500);
          relatedClicked = true;
        }
        break;

      default:
        break;
    }
  };

  const components = [
    <TitleEpisodesTab />,
    <TitleClipsTab />,
    <TitleTrailersTab />,
    <TitleCommentsTab />,
    <TitleDiscussionsTab />,
    <TitleRecommendationsTab />,
    <TitleListsTab />,
    <TitleFansTab />,
    <TitleCastTab />,
    <TitleCrewTab />,
    <TitleLanguagesTab />,
    <TitleRelatedTab />,
  ];

  const tabBarScrollRef = React.useRef<FlatList>(null);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Animated.View>
      <FlatList
        ref={tabBarScrollRef}
        horizontal
        contentContainerStyle={{
          backgroundColor: Theme.colors.background,
          gap: 4,
        }}
        data={[
          'Episodes',
          'Clips',
          'Trailers',
          'Comments',
          'Discussions',
          'Recommendations',
          'Lists',
          'Fans',
          'Cast',
          'Crew',
          'Languages',
          'Related',
        ]}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[
                {
                  padding: 4,
                },
              ]}
              onPress={() => {
                onChangeTab(index);
              }}>
              <View
                style={[
                  {
                    paddingHorizontal: 24,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderRadius: 36,
                    borderColor:
                      activeTab === index
                        ? Theme.colors.primary
                        : Theme.colors.lightgray,
                  },
                ]}>
                <CustomText
                  text={item.toString()}
                  style={{
                    color:
                      activeTab === index
                        ? Theme.colors.primary
                        : Theme.colors.lightgray,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Animated.View style={{flex: 1}}>
        {components.map((scene, index) => (
          <Animated.View
            key={index}
            style={{
              display: activeTab === index ? 'flex' : 'none',
              flex: 1,
            }}>
            {scene}
          </Animated.View>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const PlayButton = React.memo((props: any) => {
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
  movie: Movie;
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
  const tags = ['2023', '2h 20m', 'PG 13'];
  return (
    <View
      style={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        // marginTop: (420 - 260 - headerHeight) * -1,
        paddingVertical: Theme.spacing.columnGap,
      }}>
      <View style={styles.categoryContainer}>
        {props.movie.genres.map((genre, index) => (
          <View key={index} style={styles.categoryContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Genres');
              }}>
              <CategoryText category={genre.name} />
            </TouchableOpacity>
            {index !== props.movie.genres.length - 1 && (
              <View style={styles.categorySeperator}></View>
            )}
          </View>
        ))}
      </View>
      <View style={{gap: 5}}>
        <CustomText
          text={props.movie.original_title || ''}
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
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('ReleaseDates');
              }}>
              <View style={styles.tag}>
                <CustomText
                  text={tag}
                  style={{color: Theme.colors.white}}
                  weight="medium"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
