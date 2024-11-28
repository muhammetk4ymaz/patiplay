import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import nowPlayMovies from '../../../../models/now_play_movies';
import {Theme} from '../../../../constants/Theme';
import {FlagList} from '../../home';
import CustomText from '../../../../components/shared/CustomText';
import CustomPage from '../../../../components/shared/CustomPage';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import CampaignsTitleCard from './CampaignsTitleCard';
import CarouselItemForCampaigns from './CarouselItemForCampaigns';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';

type Props = {};

const CampaignsView = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Free Watch Hours?'} />;
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
      <FlagList />
      <CampaignTitles />
    </CustomPage>
  );
};

export default CampaignsView;

const styles = StyleSheet.create({});

const CampaignTitles = () => {
  return (
    <View style={{gap: 12}}>
      <FlatList
        data={nowPlayMovies}
        scrollEnabled={false}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        columnWrapperStyle={{gap: 12}}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
          paddingVertical: 12,
        }}
        renderItem={({item, index}) => {
          return (
            <CampaignsTitleCard posterPath={item.poster_path} index={index} />
          );
        }}
      />
    </View>
  );
};
