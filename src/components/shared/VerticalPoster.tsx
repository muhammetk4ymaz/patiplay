import {DimensionValue, Image, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

type Props = {
  width: DimensionValue;
  posterPath: string;
  style?: ViewStyle;
};

const VerticalPoster = (props: Props) => {
  return (
    <View
      style={[
        {
          overflow: 'hidden',
          width: props.width,
          aspectRatio: 2000 / 3000,
          borderRadius: 12,
        },
        props.style,
      ]}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.posterPath}`,
        }}
        style={[StyleSheet.absoluteFillObject]}
      />
    </View>
  );
};

export default React.memo(VerticalPoster);

const styles = StyleSheet.create({});
