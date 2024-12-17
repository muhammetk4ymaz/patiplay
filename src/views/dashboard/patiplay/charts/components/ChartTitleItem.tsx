import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Theme} from '../../../../../utils/theme';
import FastImage from 'react-native-fast-image';
import React from 'react';
import CustomText from '../../../../../components/shared/CustomText';
import {calculateGridItemWidth} from '../../../../../utils/calculateGridItemWidth';
import {ChartRatingLabel} from '../../../../../components/shared/Labels/ChartRatingLabel';

const width = Dimensions.get('window').width;

interface ChartTitleItemProps {
  item: any;
  index: number;
}

export const ChartTitleItem = React.memo((props: ChartTitleItemProps) => {
  return (
    <View
      style={{
        width: calculateGridItemWidth(3),
        borderTopLeftRadius: Theme.titlePosterRadius,
        borderTopRightRadius: Theme.titlePosterRadius,
        aspectRatio: Theme.aspectRatios.vertical,
      }}>
      <FastImage
        source={{
          uri: props.item.verticalPhotos[0].url,
        }}
        style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
      />

      <ChartRatingLabel rating={props.index} />
    </View>
  );
});
