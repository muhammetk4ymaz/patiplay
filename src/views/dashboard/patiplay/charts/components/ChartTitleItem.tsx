import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Theme} from '../../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import React from 'react';
import CustomText from '../../../../../components/shared/CustomText';

const width = Dimensions.get('window').width;

interface ChartTitleItemProps {
  title: string;
  poster_path: string;
}

export const ChartTitleItem = React.memo((props: ChartTitleItemProps) => {
  return (
    <View
      style={{
        width:
          (width -
            2 * Theme.paddings.viewHorizontalPadding -
            2 * Theme.spacing.rowGap) /
          3,
        borderTopLeftRadius: Theme.titlePosterRadius,
        borderTopRightRadius: Theme.titlePosterRadius,
        aspectRatio: Theme.aspectRatios.vertical,
      }}>
      <FastImage
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + props.poster_path,
        }}
        style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
      />

      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 36,
          alignSelf: 'flex-end',
          padding: 4,
          alignItems: 'center',
          justifyContent: 'center',
          top: -8,
          right: -8,
        }}>
        <CustomText
          text="14"
          weight="medium"
          style={{
            color: 'white',
            fontSize: 18,
          }}
        />
      </View>
    </View>
  );
});
