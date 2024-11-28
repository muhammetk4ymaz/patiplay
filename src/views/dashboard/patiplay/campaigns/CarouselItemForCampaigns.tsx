import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMovie from '../../../../models/top_movie';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../constants/Theme';
import DateLabel from '../../../../components/shared/DateLabel';

type Props = {
  item: TopMovie;
};

const CarouselItemForCampaigns = (props: Props) => {
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
        date="DAY"
        month="LAST"
        dateFontWeight="bold"
        monthFontWeight="bold"
        backgroundColor="rgba(255, 0, 0,0.5)"
        dateFontSize={Theme.fontSizes.sm}
        monthFontSize={Theme.fontSizes.sm}
      />
    </View>
  );
};

export default React.memo(CarouselItemForCampaigns);

const styles = StyleSheet.create({});
