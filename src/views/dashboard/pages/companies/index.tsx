import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Avatar} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from '../../../../components/CustomTabBar';
import CustomText from '../../../../components/shared/CustomText';
import {AddFavoriteInteractionButton} from '../../../../components/shared/InteractionButtons/AddFavoriteInteractionButton';
import {LikeInteractionButton} from '../../../../components/shared/InteractionButtons/LikeInteractionButton';
import {ImageManager} from '../../../../constants/ImageManager';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import ClipsTab from '../components/ClipsTab';
import CommentsTab from '../components/CommentsTab';
import DiscussionsTab from '../components/DiscussionsTab';
import FansTab from '../components/FansTab';
import TitlesTab from '../components/TitlesTab';

const {width, height} = Dimensions.get('window');

type RouteParams = {
  Companies: {
    slug: string;
  };
};

type Props = {};

const renderScene = (
  {route}: {route: {key: string; title: string}},
  companyData: any,
  refreshData: () => void,
) => {
  switch (route.key) {
    case 'first':
      return <TitlesTab data={companyData.titles} />;
    case 'second':
      return <ClipsTab data={companyData.clips} />;
    case 'third':
      return (
        <CommentsTab
          data={companyData.comment}
          endpoint="company-comment"
          refreshData={refreshData}
          uuid={companyData.company.slug}
        />
      );
    case 'fourth':
      return (
        <DiscussionsTab
          endpoint="company-discussion"
          data={companyData.discussion}
          uuid={companyData.company.slug}
        />
      );
    case 'fifth':
      return <TitlesTab data={companyData.company} />;
    case 'sixth':
      return <FansTab data={companyData.fans} />;
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

const CompaniesDetailView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Companies'>>();
  console.log(route.params.slug);

  const [companyData, setCompanyData] = useState<any>({});

  const [loading, setLoading] = useState(true);

  const fetchCompanyData = async () => {
    try {
      const response = await networkService.post('title/api/companies/', {
        name: route.params.slug,
      });
      console.log('Response ', response.data);
      console.log('Response Company', response.data.company.legalName);
      console.log('Response', response.data);
      setCompanyData(response.data);
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
    console.log('Rendered CompaniesDetailView');

    fetchCompanyData();
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
    <View style={{flex: 1}}>
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
              height: height * 0.45,
            }}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{width: width, height: height * 0.45}}
          />
        </View>
        <Header
          name={companyData.company.legalName}
          titlesLength={companyData.titles.len}
          clipsLength={companyData.clips.len}
          avatarUrl={companyData.company.logo}
          city={companyData.company.city}
          state={companyData.company.state}
          country={companyData.company.country}
          establishmentYear={
            companyData.company.establishmentDate.split('-')[0]
          }
          button_active={companyData.button_active}
          uuid={companyData.company.slug}
        />
        <CustomText
          text="Movie enthusiast with a passion for discovering hidden gems and the latest blockbusters"
          style={{
            color: 'white',
            fontSize: 13,
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          }}
          weight="light"
        />
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
                text="Follow"
                style={{
                  color: 'white',
                  fontSize: Theme.fontSizes.sm,
                  textAlign: 'center',
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <CustomTabBar
        routes={routes}
        renderScene={route =>
          renderScene(route, companyData, () => {
            fetchCompanyData();
          })
        }
      />
    </View>
  );
};

export default CompaniesDetailView;

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
  city: string;
  state: string;
  country: string;
  establishmentYear: number;
  button_active: any;
  uuid: string;
};

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={'xl'}
          backgroundColor={'transparent'}
          source={{
            uri: props.avatarUrl,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}>
          <CustomText text={props.name} weight="bold" style={styles.name} />
          <CustomText
            text={`${props.city}, ${props.state}, ${props.country} • ${props.establishmentYear}`}
            // text="Şişli, İstanbul, Türkiye • 2005"
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.xs,
            }}
          />
          <CustomText
            text={`${props.titlesLength} Titles • ${props.clipsLength} Clips`}
            style={{
              color: 'white',
              opacity: 0.7,
              fontSize: Theme.fontSizes.xs,
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
                endpoint="company"
                initialValue={props.button_active.like}
                uuid={props.uuid}
              />

              <AddFavoriteInteractionButton
                endpoint="company"
                initialValue={props.button_active.favorites}
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
