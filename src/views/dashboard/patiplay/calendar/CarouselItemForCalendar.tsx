import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMovie from '../../../../models/top_movie';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import DateLabel from '../../../../components/shared/DateLabel';

type Props = {
  item: TopMovie;
};

const CarouselItemForCalendar = (props: Props) => {
  return (
    <View
      style={[
        {
          justifyContent: 'flex-end',
          overflow: 'hidden',
          width: Dimensions.get('window').width * 0.7,
          aspectRatio: 2000 / 3000,
          borderRadius: 12,
        },
      ]}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
        }}
        style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
      />
      <DateLabel
        date="18"
        month="MAR"
        backgroundColor={'rgba(17, 24, 39,0.5)'}
        dateFontWeight="bold"
        dateFontSize={Theme.fontSizes.xl}
        monthFontSize={Theme.fontSizes.sm}
      />
    </View>
  );
};

export default React.memo(CarouselItemForCalendar);

const styles = StyleSheet.create({});
