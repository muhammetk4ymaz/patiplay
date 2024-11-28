import {Dimensions, View, FlatList} from 'react-native';
import React from 'react';
import nowPlayMovies from '../../../../models/now_play_movies';
import CustomPage from '../../../../components/shared/CustomPage';
import {FlagList} from '../../home';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import CarouselItemForPremiere from './CarouselItemForPremiere';
import PremiereTitleCard from './PremiereTitleCard';
import {Theme} from '../../../../constants/Theme';
import {useAppSelector} from '../../../../redux/hooks';

import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
const {width, height} = Dimensions.get('window');

type Props = {};

const PremiereView = (props: Props) => {
  console.log('Rendered PremiereView');
  const flags = ['Us', 'Tr', 'Br', 'De', 'Cn', 'Gb', 'Tr', 'Br', 'De'];

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title="Digital Premiere?" />;
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
      <FlagList />
      <FlatList
        scrollEnabled={false}
        data={nowPlayMovies}
        numColumns={4}
        removeClippedSubviews={true}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
        }}
        columnWrapperStyle={{gap: 12}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <PremiereTitleCard
            title={item}
            isExpired={index % 5 == 2 ? true : false}
            remainingSeatCount={index % 5 == 3 ? 20 : 132}
          />
        )}
      />
    </CustomPage>
  );
};

export default PremiereView;
