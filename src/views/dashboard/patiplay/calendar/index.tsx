import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomPage from '../../../../components/shared/CustomPage';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import {FlagList} from '../../home';
import nowPlayMovies from '../../../../models/now_play_movies';
import CarouselItemForCalendar from './CarouselItemForCalendar';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import DateLabel from '../../../../components/shared/DateLabel';
import {Theme} from '../../../../constants/Theme';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';

import {useHeaderHeight} from '@react-navigation/elements';

type Props = {};

const CalendarView = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Coming Soon?'} />;
  }

  const headerHeight = useHeaderHeight();

  return (
    <CustomPage
      pageName="Calendar"
      animationMultiplier={0.7}
      isBackButton={true}
      titleInitialOpacity={1}>
      <View style={{marginBottom: 12}}>
        <TitleCarousel
          data={nowPlayMovies}
          renderItem={(item, index) => <CarouselItemForCalendar item={item} />}
        />
      </View>
      <FlagList />
      <View style={{marginTop: 12}}>
        <CalendarTitles />
      </View>
    </CustomPage>
  );
};

export default CalendarView;

const CalendarTitles = () => {
  return (
    <View style={{gap: 12}}>
      <FlatList
        data={nowPlayMovies}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        columnWrapperStyle={{gap: 12}}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
        }}
        renderItem={({item}) => (
          <CalendarTitleCard posterPath={item.poster_path} />
        )}
      />
    </View>
  );
};

type CalendarTitleCardProps = {
  posterPath: string;
};

const CalendarTitleCard = React.memo((props: CalendarTitleCardProps) => {
  return (
    <View
      style={{
        width:
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            36) /
          4,
        aspectRatio: 2 / 3,
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
      <VerticalPoster
        posterPath={props.posterPath}
        width={'100%'}
        style={StyleSheet.absoluteFillObject}
      />
      <DateLabel
        date="18"
        month="MAR"
        backgroundColor={'rgba(17, 24, 39,0.5)'}
        dateFontSize={10}
        monthFontSize={8}
      />
    </View>
  );
});
