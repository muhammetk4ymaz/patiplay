import {
  ActivityIndicator,
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect} from 'react';
import CustomText from '../../../components/shared/CustomText';
import {Theme} from '../../../constants/Theme';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomTextButton from '../../../components/shared/CustomTextButton';
import Movie from '../../../models/movie';
import axios from 'axios';
import Reactions from './components/Reactions';

import TrailerEditor from './components/TrailerEditor';
import CrewChartsView from '../../dashboard/patiplay/charts/CrewChartsView';
import CinephilesChartsView from '../../dashboard/patiplay/charts/CinephilesChartsView';
import TitleEpisodesTab from './tabs/TitleEpisodesTab';
import TitleClipsTab from './tabs/TitleClipsTab';
import {useAppDispatch} from '../../../redux/hooks';
import {
  setCasts,
  setClips,
  setComments,
  setCrew,
  setDiscussions,
  setEpisodes,
  setFans,
  setLanguages,
  setList,
  setRecommmendaions,
  setRelated,
  setTrailers,
} from '../../../redux/features/titledetail/titleDetailSlice';
import popularTitles from '../../../models/popular';
import TitleCommentsTab from './tabs/TitleCommentsTab';
import upComingTitles from '../../../models/upcoming';
import TitleTrailersTab from './tabs/TitleTrailersTab';
import TitleDiscussionsTab from './tabs/TitleDiscussionsTab';
import TitleRecommendationsTab from './tabs/TitleRecommendationsTab';
import {TitleListView} from '../../dashboard/patiplay/lists/TitleListView';
import TitleListsTab from './tabs/TitleListsTab';
import TitleFansTab from './tabs/TitleFansTab';
import TitleCastTab from './tabs/TitleCastTab';
import TitleCrewTab from './tabs/TitleCrewTab';
import TitleLanguagesTab from './tabs/TitleLanguagesTab';
import TitleRelatedTab from './tabs/TitleRelatedTab';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {RootStackParamList} from '../../../navigation/routes';

const ChildMemo = memo(TitleEpisodesTab);

const renderScene = ({index}: {index: number}) => {
  switch (index) {
    case 0:
      return <ChildMemo />;
    case 1:
      return <TitleClipsTab />;
    case 2:
      return <TitleTrailersTab />;
    case 3:
      return <TitleCommentsTab />;
    case 4:
      return <TitleDiscussionsTab />;
    case 5:
      return <TitleRecommendationsTab />;
    case 6:
      return <TitleListsTab />;
    case 7:
      return <TitleFansTab />;
    case 8:
      return <TitleCastTab />;
    case 9:
      return <TitleCrewTab />;
    case 10:
      return <TitleLanguagesTab />;
    case 11:
      return <TitleRelatedTab />;
    default:
      return;
  }
};

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

  const Header = () => {
    return (
      <View
        style={{
          backgroundColor: 'black',
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
          <Reactions />
        </View>
      </View>
    );
  };

  return (
    <Animated.ScrollView
      style={{flexGrow: 1, backgroundColor: 'black'}}
      removeClippedSubviews>
      <Header />
      <TabsView />
    </Animated.ScrollView>
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
          }, 1000);
          clipClicked = true;
        }
        break;

      case 2:
        if (!trailerClicked) {
          setTimeout(() => {
            dispatch(setTrailers(upComingTitles));
          }, 1000);
          trailerClicked = true;
        }
        break;

      case 3:
        if (!commentClicked) {
          setTimeout(() => {
            dispatch(setComments(popularTitles));
          }, 500);
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
          }, 500);
          recommendationClicked = true;
        }
        break;

      case 6:
        if (!listClicked) {
          setTimeout(() => {
            dispatch(setList(popularTitles));
          }, 500);
          listClicked = true;
        }
        break;

      case 7:
        if (!fanClicked) {
          setTimeout(() => {
            dispatch(setFans(popularTitles));
          }, 500);
          fanClicked = true;
        }
        break;

      case 8:
        if (!castClicked) {
          setTimeout(() => {
            dispatch(setCasts(popularTitles));
          }, 500);
          castClicked = true;
        }
        break;

      case 9:
        if (!crewClicked) {
          setTimeout(() => {
            dispatch(setCrew(popularTitles));
          }, 500);
          crewClicked = true;
        }
        break;

      case 10:
        if (!languageClicked) {
          setTimeout(() => {
            dispatch(setLanguages(popularTitles));
          }, 500);
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
    <View>
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
      {renderScene({index: activeTab})}
    </View>
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
            <CategoryText category={genre.name} />
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
            <View key={index} style={styles.tag}>
              <CustomText
                text={tag}
                style={{color: Theme.colors.white}}
                weight="medium"
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
