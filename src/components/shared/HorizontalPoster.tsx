import {DimensionValue, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native-phone-input';

type Props = {
  width: DimensionValue;
  backdrop_path: string;
  style?: ViewStyle;
};

const HorizontalPoster = (props: Props) => {
  return (
    <View
      style={[
        {
          overflow: 'hidden',
          width: props.width,
          aspectRatio: 500 / 281,
          borderRadius: 12,
        },
        props.style,
      ]}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.backdrop_path}`,
        }}
        style={[StyleSheet.absoluteFillObject]}
      />
    </View>
  );
};

export default React.memo(HorizontalPoster);

const styles = StyleSheet.create({});
