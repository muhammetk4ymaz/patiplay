import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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
import TeamTabs from './components/TeamTabs';
import {Center} from 'native-base';
import AvatarGroupComponent from '../../../components/shared/AvatarGroupComponent';
import Reactions from './components/Reactions';
import {useTranslation} from 'react-i18next';
import '../../../i18n';

import DeviceInfo from 'react-native-device-info';
import TrailerEditor from './components/TrailerEditor';
import CustomTabBar from '../../../components/CustomTabBar';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import TitleChartsView from '../../dashboard/patiplay/charts/TitlesChartsView';
import CompaniesChartsView from '../../dashboard/patiplay/charts/CompaniesChartsView';
import CastChartsView from '../../dashboard/patiplay/charts/CastChartsView';
import CrewChartsView from '../../dashboard/patiplay/charts/CrewChartsView';
import CinephilesChartsView from '../../dashboard/patiplay/charts/CinephilesChartsView';
import DynamicHeightTab from '../../../components/DynamicHeightTab';
import {Tabs} from 'react-native-collapsible-tab-view';
import nowPlayMovies from '../../../models/now_play_movies';
import {ChartTitleItem} from '../../dashboard/patiplay/charts/components/ChartTitleItem';
import Comment from '../movie_player/components/Comment';
import {RootStackParamList} from '../../../navigation/routes';

type RouteParams = {
  MovieDetail: {
    movieId: string;
  };
};

const renderScene = SceneMap({
  first: TitleChartsView,
  second: CompaniesChartsView,
  third: CastChartsView,
  fourth: CrewChartsView,
  fifth: CinephilesChartsView,
});

const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Companies'},
  {key: 'third', title: 'Cast'},
  {key: 'fourth', title: 'Crew'},
  {key: 'fifth', title: 'Cinephiles'},
];

const MovieDetailView = () => {
  const route = useRoute<RouteProp<RouteParams, 'MovieDetail'>>();
  const movieId = route.params.movieId;
  const [movie, setMovie] = React.useState<Movie>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const tabBarScrollRef = React.useRef<FlatList>(null);

  const [activeTab, setActiveTab] = React.useState(0);
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

  const DATA = [0, 1, 2, 3, 4];

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

  const onChangeTab = (index: number) => {
    setActiveTab(index);
    tabBarScrollRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  return (
    <Tabs.Container
      onIndexChange={onChangeTab}
      allowHeaderOverscroll={true}
      headerContainerStyle={{
        backgroundColor: Theme.colors.background,
      }}
      renderHeader={Header}
      containerStyle={{
        backgroundColor: Theme.colors.background,
      }}
      renderTabBar={props => (
        <FlatList
          ref={tabBarScrollRef}
          horizontal
          contentContainerStyle={{
            backgroundColor: Theme.colors.background,
            gap: 4,
          }}
          data={['Details', 'Episodes', 'Comments']}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  {
                    padding: 4,
                  },
                ]}
                onPress={() => {
                  props.onTabPress(item);
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
      )}>
      <Tabs.Tab name="Details">
        <Tabs.ScrollView
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: Theme.spacing.rowGap,
          }}>
          <CustomText
            text={movie?.overview || ''}
            style={styles.movieOverview}
            weight="medium"
          />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Episodes">
        <Tabs.FlatList
          data={nowPlayMovies}
          numColumns={3}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: Theme.spacing.rowGap,
          }}
          columnWrapperStyle={{
            gap: Theme.spacing.columnGap,
          }}
          renderItem={({item}) => (
            <ChartTitleItem title={item.title} poster_path={item.poster_path} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Tabs.Tab>

      <Tabs.Tab name="Comments">
        <Tabs.FlatList
          data={nowPlayMovies}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: Theme.spacing.rowGap,
          }}
          renderItem={({item}) => <Comment />}
          keyExtractor={item => item.id.toString()}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default MovieDetailView;

const AddToWatchlistButton = React.memo((props: any) => {
  const {t} = useTranslation();
  return (
    <CustomTextButton
      text={t('common:actions.addToWatchlist')}
      onPress={() => {}}
      borderRadius={36}
      backgroundColor="#2E2D2DFF"
    />
  );
});

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

const DubRequestButton = () => {
  return (
    <RequestButton
      text="Dub Request"
      onPress={() => {
        console.log('Dub Request');
      }}
    />
  );
};

const SubsRequestButton = () => {
  return (
    <RequestButton
      text="Subs Request"
      onPress={() => {
        console.log('Dub Request');
      }}
    />
  );
};

type RequestButtonProps = {
  text: string;
  onPress: () => void;
};

const RequestButton = (props: RequestButtonProps) => {
  return (
    <CustomTextButton
      text={props.text}
      paddingHorizontal={18}
      paddingVertical={6}
      textStyle={{fontSize: Theme.fontSizes.xs}}
      onPress={props.onPress}
      borderRadius={36}
      backgroundColor="#101725FF"
    />
  );
};
