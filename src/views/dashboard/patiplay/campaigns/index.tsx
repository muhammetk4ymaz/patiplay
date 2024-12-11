import axios from 'axios';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import CustomPage from '../../../../components/shared/CustomPage';
import {FlagList} from '../../../../components/shared/FlagList';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import networkService from '../../../../helpers/networkService';
import nowPlayMovies from '../../../../models/now_play_movies';
import {CampaignModel} from '../../../../models/patiplay/CampaignModel';
import {CountryModel} from '../../../../models/patiplay/CountryModel';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import CarouselItemForCampaigns from './CarouselItemForCampaigns';
import {Theme} from '../../../../utils/theme';
import CampaignsTitleCard from './CampaignsTitleCard';

type Props = {};

const CampaignsView = (props: Props) => {
  const [campaignsData, setCampaignsData] = React.useState<CampaignModel[]>([]);
  const [countryData, setCountryData] = React.useState<CountryModel[]>([]);

  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  React.useEffect(() => {
    console.log('Rendered CampaignsView');

    const fetchCampaignsData = async () => {
      try {
        const response = await networkService.get('title/api/campaign-view/');
        console.log('Response', response.data.other_days[0]);
        setCampaignsData(response.data.other_days);

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

    fetchCampaignsData();
  }, []);

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Free Watch Hours?'} />;
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
      animationMultiplier={0.3}
      pageName="Campaigns"
      isBackButton={true}
      titleInitialOpacity={1}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => <CarouselItemForCampaigns item={item} />}
        />
      </View>
      <FlagList
        flags={
          countryData.length > 0
            ? countryData.map(country => country.iso2!)
            : []
        }
      />
      <CampaignsList campaignsData={campaignsData} />
    </CustomPage>
  );
};

export default CampaignsView;

type CampaignsListProps = {
  campaignsData: CampaignModel[];
};

const CampaignsList = (props: CampaignsListProps) => {
  let newCampaignsData: CampaignModel[] = [];

  props.campaignsData.forEach((item: any) => {
    Object.keys(item).forEach((key: string) => {
      item[key].forEach((campaign: CampaignModel) => {
        newCampaignsData.push(campaign);
      });
    });
  });

  return (
    <View style={{gap: 12}}>
      <FlatList
        data={newCampaignsData}
        scrollEnabled={false}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        columnWrapperStyle={{columnGap: Theme.spacing.columnGap}}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
          paddingVertical: 12,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CampaignsTitleCard item={item} index={index} />
        )}
      />
    </View>
  );
};
