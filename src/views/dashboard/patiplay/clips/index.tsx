import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomPage from '../../../../components/shared/CustomPage';
import {DelayedComponent} from '../../home';
import popularTitles from '../../../../models/popular';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import TopMovie from '../../../../models/top_movie';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ProgressIndicator from '../../../../components/shared/ProgressIndicator';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import nowPlayMovies from '../../../../models/now_play_movies';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import NewLabel from '../../../../components/shared/Labels/NewLabel';
import {FlagList} from '../../../../components/shared/FlagList';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import {ImageManager} from '../../../../constants/ImageManager';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import {CountryModel} from '../../../../models/patiplay/CountryModel';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {};

const ClipsView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  const [clipData, setClipData] = React.useState<any[]>([]);
  const [countryData, setCountryData] = React.useState<CountryModel[]>([]);

  React.useEffect(() => {
    console.log('Rendered ClipsView');

    const fetchClipData = async () => {
      try {
        const response = await networkService.post('title/api/clip-view/', {
          type: 'clip',
        });
        console.log(response.data.clip);
        setClipData(response.data.clip);
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

    const fetchCountry = async () => {
      try {
        const response = await networkService.post('title/api/clip-view/', {
          type: 'country',
        });
        console.log(response.data.countries);
        setCountryData(response.data.countries);
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

    fetchClipData();
    fetchCountry();
  }, []);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return (
      <PreRegistrationView
        title={'Clips from Your Favorite\nFilms & TV Shows?'}
      />
    );
  }

  if (loading) {
    return <LoadingWidget />;
  }

  return (
    <CustomPage
      pageName="Clips"
      animationMultiplier={0.4}
      isBackButton={true}
      titleInitialOpacity={1}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => (
            <VerticalPoster
              width={Dimensions.get('window').width * 0.7}
              posterPath={item.poster_path}
            />
          )}
        />
      </View>
      <FlagList
        flags={
          countryData.length > 0
            ? countryData.map(country => country.iso2!)
            : []
        }
      />
      <View style={{marginTop: 12, gap: 24}}>
        <DelayedComponent delay={100}>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              rowGap: Theme.spacing.rowGap,
            }}
            columnWrapperStyle={{columnGap: Theme.spacing.columnGap}}
            data={clipData.slice(0, 10)}
            renderItem={({item, index}) => (
              <ClipCard item={item} index={index} />
            )}
          />
        </DelayedComponent>
        <DelayedComponent delay={300}>
          <FlatList
            horizontal
            data={clipData.slice(0, 10)}
            contentContainerStyle={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              gap: 12,
            }}
            renderItem={({item}) => (
              <View
                style={{
                  aspectRatio: 2 / 3,
                  width: calculateGridItemWidth(2.5),
                  alignSelf: 'center',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: item.title.verticalPhotos[0].url,
                  }}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
            )}
          />
        </DelayedComponent>
        <DelayedComponent delay={400}>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              rowGap: Theme.spacing.rowGap,
            }}
            columnWrapperStyle={{columnGap: Theme.spacing.columnGap}}
            data={clipData.slice(0, 10)}
            renderItem={({item, index}) => (
              <ClipCard item={item} index={index} />
            )}
          />
        </DelayedComponent>
        <DelayedComponent delay={500}>
          <FlatList
            horizontal
            data={clipData.slice(0, 10)}
            contentContainerStyle={{
              paddingHorizontal: Theme.paddings.viewHorizontalPadding,
              gap: 12,
            }}
            renderItem={({item}) => (
              <View
                style={{
                  aspectRatio: 2 / 3,
                  width: calculateGridItemWidth(2.5),
                  alignSelf: 'center',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: item.title.verticalPhotos[0].url,
                  }}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
            )}
          />
        </DelayedComponent>
      </View>
    </CustomPage>
  );
};

export default ClipsView;

const styles = StyleSheet.create({});

const ClipCard = ({item, index}: {item: any; index: number}) => {
  return (
    <View style={{flex: 1, gap: 5}}>
      <View
        style={{
          aspectRatio: Theme.aspectRatios.horizontal,
          width: calculateGridItemWidth(2),
          borderRadius: 12,
          overflow: 'hidden',
          justifyContent: 'flex-end',
          gap: 8,
        }}>
        {item.filmImageUrl.length > 0 ? (
          <Image
            source={{
              uri: item.filmImageUrl[0].url,
            }}
            resizeMode="contain"
            style={[StyleSheet.absoluteFillObject]}
          />
        ) : (
          <Image
            source={ImageManager.IMAGE_NAMES.PATIHORIZONTALLOGO}
            resizeMode="contain"
            style={[
              StyleSheet.absoluteFillObject,
              {
                width: '100%',
                height: '100%',
              },
            ]}
          />
        )}

        {index % 4 === 3 && <NewLabel />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 8,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingVertical: 2,
              paddingHorizontal: 4,
              borderRadius: 4,
            }}>
            <CustomText
              text="3h 18m"
              style={{color: 'white', fontSize: 12, opacity: 1}}
            />
          </View>
        </View>
        <ProgressIndicator
          percentage={50}
          progressColor={['#080808', '#080808']}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={item.name[0].title}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
            }}
            weight="light"
          />
          <CustomText
            numberOfLines={1}
            text={item.title.title[0].title}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
              opacity: 0.5,
            }}
            weight="light"
          />
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
