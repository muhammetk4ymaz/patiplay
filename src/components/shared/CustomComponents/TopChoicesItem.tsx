import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from '../../../utils/theme';

type Props = {
  item: any;
};

const TopChoicesItem = (props: Props) => {
  return (
    <View
      style={{
        paddingTop: 36,
      }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.item.backdrop_path}`,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={50}
      />
      <LinearGradient
        colors={['black', 'transparent', 'black']}
        style={StyleSheet.absoluteFillObject}></LinearGradient>

      <View
        style={{
          width: Dimensions.get('window').width,
        }}>
        <View
          style={{
            aspectRatio: Theme.aspectRatios.horizontal,
            width:
              Dimensions.get('window').width -
              2 * Theme.paddings.viewHorizontalPadding,
            // height: 100,
            borderRadius: Theme.titlePosterRadius,
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          <FastImage
            source={{
              uri: `https://image.tmdb.org/t/p/w500${props.item.backdrop_path}`,
            }}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(TopChoicesItem);

const styles = StyleSheet.create({});
