import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import CustomPage from '../../../../components/shared/CustomPage';
import TitleCarousel from '../../../../components/shared/TitleCarousel';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import nowPlayMovies from '../../../../models/now_play_movies';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../utils/theme';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';
import CarouselItemForCalendar from './CarouselItemForCalendar';
import {FlagList} from '../../../../components/shared/FlagList';
import DateLabel from '../../../../components/shared/Labels/DateLabel';
import networkService from '../../../../helpers/networkService';
import axios from 'axios';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {};

const CalendarView = (props: Props) => {
  const [calendarData, setCalendarData] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  React.useEffect(() => {
    console.log('Rendered CalendarView');

    const fetchCampaignsData = async () => {
      try {
        const response = await networkService.get(
          'title/api/calender-page-view/',
        );
        console.log('Response', response.data);
        setCalendarData(response.data);
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
    return <PreRegistrationView title={'Coming Soon?'} />;
  }

  if (loading) {
    return <LoadingWidget />;
  }

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
        columnWrapperStyle={{gap: Theme.spacing.columnGap}}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
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
        day="18"
        month="MAR"
        backgroundColor={'rgba(17, 24, 39,0.5)'}
        dateFontSize={10}
        monthFontSize={8}
      />
    </View>
  );
});
