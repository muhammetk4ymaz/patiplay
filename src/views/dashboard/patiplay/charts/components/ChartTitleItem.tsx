import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Theme} from '../../../../../utils/theme';
import FastImage from 'react-native-fast-image';
import React from 'react';
import CustomText from '../../../../../components/shared/CustomText';
import {calculateGridItemWidth} from '../../../../../utils/calculateGridItemWidth';

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
          text={props.index.toString()}
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
