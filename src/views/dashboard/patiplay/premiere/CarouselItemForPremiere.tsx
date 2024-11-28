import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  poster_path: string;
};

const CarouselItemForPremiere = (props: Props) => {
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
          uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
        }}
        style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}
      />
    </View>
  );
};

export default React.memo(CarouselItemForPremiere);

const styles = StyleSheet.create({});
