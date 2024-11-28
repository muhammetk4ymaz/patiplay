import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../constants/Theme';
import CustomText from '../../../components/shared/CustomText';
import topMovies from '../../../models/topMovies';
import LinearGradient from 'react-native-linear-gradient';
import {characterLimited} from '../profile/favorite_companies';
import TopMovie from '../../../models/top_movie';
import FlagComponent from '../../../components/shared/FlagComponent';
import {useHeaderHeight} from '@react-navigation/elements';
import CustomPage from '../../../components/shared/CustomPage';
import VerticalPoster from '../../../components/shared/VerticalPoster';
import ListHeaderText from '../../../components/shared/ListHeaderText';
import SectionTitleText from '../../../components/shared/SectionTitleText';
import MissionSection from './components/MissionSection';
import BestMatches from './components/BestMatches';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import PreRegistrationView from '../../preregistration/PreRegistrationView';

type Props = {};

const SPACING = 10;

const MyMissionView = (props: Props) => {
  const tabBarScrollRef = React.useRef<FlatList>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeTabs, setActiveTabs] = React.useState([0]);

  const onTabPress = (index: number) => {
    setActiveTab(index);
    if (!activeTabs.includes(index)) {
      setActiveTabs([...activeTabs, index]);
    }
    tabBarScrollRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Daily Missions?'} />;
  }

  return (
    <CustomPage
      pageName="My Mission 🔥 705"
      animationMultiplier={0.3}
      titleInitialOpacity={1}>
      <MissionSection
        country="United Arab Emirates"
        genre="Science Fiction"
        type="Film"
        duration="5m"
        countryCode="It"
      />
      <View style={{top: -120, gap: SPACING}}>
        <BestMatches />
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
                  onTabPress(index);
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
        {components.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                display: activeTab === index ? 'flex' : 'none',
              }}>
              <MissionHistory
                id={index}
                isViewable={activeTabs.includes(index)}
              />
            </View>
          );
        })}
      </View>
    </CustomPage>
  );
};

export default MyMissionView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

type MissionHistoryProps = {
  id: number;
  isViewable: boolean;
};

const MissionHistory = React.memo(
  (props: MissionHistoryProps) => {
    console.log('MissionHistory rendered', props.isViewable);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      if (props.isViewable) {
        console.log('Data Fetching');
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, [props.isViewable]);

    if (!props.isViewable) {
      return null;
    }

    if (loading) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            flex: 1,
          }}>
          <CustomText
            text="Loading..."
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.xl,
            }}
          />
        </View>
      );
    }

    return (
      <View style={{gap: SPACING - 3}}>
        <View
          style={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          }}>
          <SectionTitleText title="Mission History" />
        </View>
        <View style={{gap: SPACING * 2}}>
          <MissionHistoryItem
            time={props.id.toString()}
            country="United States"
            points={'1,047'}
            genre="Science Fiction"
            duration="15m"
            movie={topMovies[8]}
            enjoyedDuration="1h 15m"
          />
        </View>
        <View style={{gap: SPACING * 2}}>
          <MissionHistoryItem
            time="18"
            country="United States"
            points={'1,047'}
            genre="Science Fiction"
            duration="15m"
            movie={topMovies[8]}
            enjoyedDuration="1h 15m"
          />
          <MissionHistoryItem
            time="17"
            isWarning={true}
            points="1,000"
            country="Turkey"
            genre="Comedy"
            duration="20m"
            movie={topMovies[9]}
          />
          <MissionHistoryItem
            time="18"
            country="Germany"
            points={'1,050'}
            genre="Romance"
            duration="25m"
            movie={topMovies[12]}
            enjoyedDuration="1h 15m"
          />
          <MissionHistoryItem
            time="18"
            country="Belgium"
            points={'1,300'}
            genre="Drama"
            duration="10m"
            movie={topMovies[11]}
            enjoyedDuration="1h 15m"
          />
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isViewable === nextProps.isViewable;
  },
);

type MissionHistoryItemProps = {
  isWarning?: boolean;
  time?: string;
  country: string;
  genre?: string;
  duration: string;
  movie: TopMovie;
  enjoyedDuration?: string;
  points: string;
};

const MissionHistoryItem = (props: MissionHistoryItemProps) => {
  return (
    <View
      style={{
        paddingLeft: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING * 2,
      }}>
      <View
        style={{
          top: -2,
          width: '20%',
          alignItems: 'center',
          backgroundColor: 'black',
          borderRadius: 12,
          // paddingVertical: 12,
          // paddingHorizontal: 8,
          // shadowColor: '#FFFFFF', // Gölgenin rengi
          // shadowOffset: {
          //   width: 0, // Gölgenin yatay kaydırması
          //   height: 2, // Gölgenin dikey kaydırması
          // },
          // shadowOpacity: 0.25, // Gölgenin opaklığı
          // shadowRadius: 6, // Gölgenin bulanıklığı
          // elevation: 5, // Android için gölge derinliği
        }}>
        <CustomText
          text={props.isWarning ? '-10' : props.points}
          style={{
            // color: '#E4A3FF',
            // color: '#FFD700',
            color: props.isWarning ? 'red' : '#33EB9C',
            fontSize: Theme.fontSizes.xl,
            textAlign: 'center',
          }}
          weight="bold"
        />

        <View
          style={{
            gap: SPACING,
          }}>
          <CustomText
            text={`MAR\n${props.time}`}
            style={{
              color: 'white',
              opacity: 0.5,
              textAlign: 'center',
              fontSize: Theme.fontSizes.sm,
            }}
            weight="medium"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          gap: SPACING * 2,
        }}>
        <View
          style={{
            gap: SPACING,
            flex: 1,
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <View>
            <CustomText
              text={characterLimited(props.country, 15)}
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
              }}
            />
            <CustomText
              text={`${props.genre}\nFilm`}
              weight="light"
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
              }}
            />
            <CustomText
              text={props.duration}
              weight="light"
              style={{
                color: 'white',
                opacity: 0.5,
                fontSize: Theme.fontSizes.sm,
              }}
            />
          </View>
        </View>
        {props.isWarning ? (
          <View
            style={{
              top: 2,
              width: '55%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#990000',
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}>
            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 10,
              }}>
              <CustomText
                text={"You didn't complete \nyour mission this day!"}
                weight="medium"
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: Theme.fontSizes.xs,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{width: '55%', gap: SPACING, paddingRight: 18, top: 2}}>
            <View
              style={{
                width: '100%',
                aspectRatio: 500 / 281,
                borderRadius: 12,
                overflow: 'hidden',
                justifyContent: 'flex-end',
                backgroundColor: 'red',
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`,
                }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
            <View>
              <CustomText
                text={props.movie.title}
                numberOfLines={1}
                style={{
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                }}
              />
              <CustomText
                text="1h 15m enjoyed"
                weight="light"
                style={{
                  opacity: 0.5,
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                }}
              />
              <CustomText
                text="5m counted"
                weight="light"
                style={{
                  opacity: 0.5,
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const components = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
