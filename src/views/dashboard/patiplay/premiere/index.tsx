import React from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import CustomPage from '../../../../components/shared/CustomPage';
import nowPlayMovies from '../../../../models/now_play_movies';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import {useAppSelector} from '../../../../redux/hooks';
import {Theme} from '../../../../utils/theme';
import CarouselItemForPremiere from './CarouselItemForPremiere';
import PremiereTitleCard from './PremiereTitleCard';
import axios from 'axios';
import {FlagList} from '../../../../components/shared/FlagList';
import networkService from '../../../../helpers/networkService';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import {CountryModel} from '../../../../models/patiplay/CountryModel';
import {DigitalGalaModel} from '../../../../models/patiplay/DigitalGalaModel';
const {width, height} = Dimensions.get('window');

type Props = {};

const PremiereView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  const [premiereData, setPremiereData] = React.useState<DigitalGalaModel[]>(
    [],
  );
  const [countryData, setCountryData] = React.useState<CountryModel[]>([]);

  React.useEffect(() => {
    console.log('Rendered PremiereView');

    const fetchPremiereData = async () => {
      try {
        const response = await networkService.post('title/api/premiere-view/', {
          type: 'digitalGalas',
        });
        console.log(response.data.digitalGala);
        setPremiereData(response.data.digitalGala);
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
        const response = await networkService.post('title/api/premiere-view/', {
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

    fetchPremiereData();
    fetchCountry();
  }, []);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title="Digital Premiere?" />;
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <CustomPage
      pageName="Premiere"
      animationMultiplier={0.7}
      titleInitialOpacity={1}
      isBackButton={true}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => (
            <CarouselItemForPremiere poster_path={item.poster_path} />
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
      <FlatList
        scrollEnabled={false}
        data={premiereData}
        numColumns={4}
        removeClippedSubviews={true}
        contentContainerStyle={{
          rowGap: Theme.spacing.rowGap,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
        }}
        columnWrapperStyle={{columnGap: Theme.spacing.columnGap}}
        keyExtractor={(item, index) => 'premiere-gala-item' + index}
        renderItem={({item, index}) => <PremiereTitleCard item={item} />}
      />
    </CustomPage>
  );
};

export default PremiereView;
