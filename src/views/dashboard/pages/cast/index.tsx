import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from '../../../../components/CustomTabBar';
import FollowButton from '../../../../components/shared/Buttons/FollowButton';
import CustomText from '../../../../components/shared/CustomText';
import {AddFavoriteInteractionButton} from '../../../../components/shared/InteractionButtons/AddFavoriteInteractionButton';
import {LikeInteractionButton} from '../../../../components/shared/InteractionButtons/LikeInteractionButton';
import LoadingWidget from '../../../../components/shared/LoadingWidget';
import {ImageManager} from '../../../../constants/ImageManager';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import {DynamicHeader} from '../companies';
import ClipsTab from '../components/ClipsTab';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import TitlesTab from '../components/TitlesTab';

const {width, height} = Dimensions.get('window');

const iconSize = 14;

type RouteParams = {
  Cast: {
    slug: string;
  };
};

type Props = {};

const CastDetailView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Cast'>>();
  console.log(route.params.slug);
  const [castData, setCastData] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const fetchCastData = async () => {
    try {
      const response = await networkService.post('title/api/cast/', {
        name: route.params.slug,
      });
      console.log('Response Actor', response.data.actor);
      console.log('Response', response.data);
      setCastData(response.data);
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

    fetchCastData();
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
            name={castData.actor.name}
            titlesLength={castData.titles.len}
            clipsLength={castData.clips.len}
            avatarUrl={castData.actor.image}
            button_active={castData.button_active}
            uuid={castData.actor.slug}
          />
          <View
            style={{paddingHorizontal: Theme.paddings.viewHorizontalPadding}}>
            <FollowButton
              endpoint="cast"
              initialValue={castData.in_network}
              uuid={castData.actor.slug}
            />
          </View>
        </View>
      </DynamicHeader>

      <CustomTabBar
        routes={routes}
        renderScene={route =>
          renderScene(route, castData, () => {
            fetchCastData();
          })
        }
      />
    </View>
  );
};

export default CastDetailView;

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
  React.useEffect(() => {
    console.log('Button Active', props.button_active);
  }, []);
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        {props.avatarUrl ? (
          <Avatar
            size={'xl'}
            background={'transparent'}
            source={{
              uri: props.avatarUrl,
            }}
          />
        ) : (
          <Avatar
            size={'xl'}
            background={'transparent'}
            source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
          />
        )}
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
                endpoint="actor-b2c"
                initialValue={props.button_active.like}
                uuid={props.uuid}
              />
              {/* <ReactionToggleComponent
                endpoint="actor-b2c"
                uuid={props.uuid}
                initialValue={props.button_active.react}
                iconSize={Theme.iconSizes.interactionIcon}
              /> */}

              <AddFavoriteInteractionButton
                endpoint="actor-b2c"
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

const renderScene = (
  {route}: {route: {key: string; title: string}},
  castData: any,
  refreshData: () => void,
) => {
  switch (route.key) {
    case 'first':
      return <TitlesTab data={castData.titles} />;
    case 'second':
      return <ClipsTab data={castData.clips} />;
    case 'third':
      return (
        <CommentsTab
          endpoint="cast-comment"
          data={castData.comment}
          refreshData={refreshData}
          uuid={castData.actor.slug}
        />
      );
    case 'fourth':
      return (
        <DiscussionsTab
          endpoint="cast-discussion"
          data={castData.discussion}
          uuid={castData.actor.slug}
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
