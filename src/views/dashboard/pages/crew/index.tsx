import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from '../../../../components/CustomTabBar';
import StatsCard from '../../../../components/shared/Cards/StatsCard';
import CustomText from '../../../../components/shared/CustomText';
import {ImageManager} from '../../../../constants/ImageManager';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import ClipsTab from '../components/ClipsTab';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import FansTab from '../components/FansTab';
import TitlesTab from '../components/TitlesTab';
import {LikeInteractionButton} from '../../../../components/shared/InteractionButtons/LikeInteractionButton';
import {AddFavoriteInteractionButton} from '../../../../components/shared/InteractionButtons/AddFavoriteInteractionButton';
import {DynamicHeader} from '../companies';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const {width, height} = Dimensions.get('window');

type RouteParams = {
  Crew: {
    slug: string;
  };
};

type Props = {};

const CrewDetailView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Crew'>>();

  console.log(route.params.slug);

  const [crewData, setCrewData] = useState<any>({});

  const [loading, setLoading] = useState(true);

  const fetchCrewData = async () => {
    try {
      const response = await networkService.post('title/api/crew/', {
        name: route.params.slug,
      });
      console.log('Response Crew', response.data);
      console.log('Response', response.data);
      setCrewData(response.data);
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

  React.useEffect(() => {
    console.log('Rendered CastDetailView');

    fetchCrewData();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <DynamicHeader componentHeight={height * 0.45}>
        <View
          style={{
            height: height * 0.45,
            justifyContent: 'flex-end',
            gap: 12,
            zIndex: 0,
          }}>
          <View style={{flex: 1}}>
            <Image
              source={ImageManager.IMAGE_NAMES.DETAILBACKGROUND}
              style={{
                ...StyleSheet.absoluteFillObject,
                width: width,
                height: height * 0.4,
              }}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={{width: width, height: height * 0.4}}
            />
          </View>

          <Header
            name={crewData.crew.name}
            titlesLength={crewData.titles.len}
            clipsLength={crewData.clips.len}
            avatarUrl={crewData.crew.image}
            button_active={crewData.button_active}
            uuid={crewData.crew.slug}
          />

          <StatsSection />

          <View
            style={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            }}></View>
        </View>
      </DynamicHeader>

      <CustomTabBar
        routes={routes}
        renderScene={route =>
          renderScene(route, crewData, () => {
            fetchCrewData();
          })
        }
      />
    </View>
  );
};

export default CrewDetailView;

const styles = StyleSheet.create({
  header: {
    width: width,
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    flexDirection: 'row',
    gap: 12,
  },
  name: {
    color: 'white',
    fontSize: Theme.fontSizes.lg,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.columnGap,
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
});

type HeaderProps = {
  name: string;
  titlesLength: number;
  clipsLength: number;
  avatarUrl: string;
  button_active: any;
  uuid: string;
};

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={'xl'}
          background={'transparent'}
          source={
            props.avatarUrl
              ? {uri: props.avatarUrl}
              : ImageManager.IMAGE_NAMES.PATIPLAYLOGO
          }
        />
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}>
          <CustomText text={props.name} weight="bold" style={styles.name} />
          <CustomText
            text={`${props.titlesLength} Titles • ${props.clipsLength} Clips`}
            // text="82 Titles • 1.7K Clips"
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.xs,
              opacity: 0.7,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'space-between',
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
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'flex-end',
              }}>
              <LikeInteractionButton
                endpoint="crew-b2c"
                initialValue={props.button_active.like}
                uuid={props.uuid}
              />
              {/* <ReactionToggleComponent
                endpoint="crew-b2c"
                uuid={props.uuid}
                initialValue={props.button_active.react}
                iconSize={Theme.iconSizes.interactionIcon}
              /> */}

              <AddFavoriteInteractionButton
                endpoint="crew-b2c"
                initialValue={props.button_active.favorite}
                uuid={props.uuid}
              />
              {/* <InteractionButton
                icon={
                  <IconIonicons
                    name={'share-social'}
                    color="white"
                    size={iconSize}
                  />
                }
                initialActive={false}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const StatsSection = () => {
  return (
    <View style={styles.stats}>
      <StatsCard title={'Director'} value="43" />
      <StatsCard title={'Screenwriter'} value="21" />
      <StatsCard title={'Producer'} value="12" />
      <StatsCard title={'Actor / Actress'} value="8" />
    </View>
  );
};

const renderScene = (
  {route}: {route: {key: string; title: string}},
  crewData: any,
  refreshData: () => void,
) => {
  switch (route.key) {
    case 'first':
      return <TitlesTab data={crewData.titles} />;
    case 'second':
      return <ClipsTab data={crewData.clips} />;
    case 'third':
      return (
        <CommentsTab
          data={crewData.comment}
          refreshData={refreshData}
          uuid={crewData.crew.slug}
          endpoint="crew-comment"
        />
      );
    case 'fourth':
      return (
        <DiscussionsTab
          data={crewData.discussion}
          uuid={crewData.crew.slug}
          endpoint="crew-discussion"
        />
      );
    case 'fifth':
      return null;
    case 'sixth':
      return null;
    default:
      return null;
  }
};
const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Clips'},
  {key: 'third', title: 'Comments'},
  {key: 'fourth', title: 'Discussions'},
  {key: 'fifth', title: 'Lists'},
  {key: 'sixth', title: 'Fans'},
];
