import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Theme} from '../../../constants/Theme';
import CustomText from '../CustomText';
import ProgressIndicator from '../ProgressIndicator';

type Props = {
  backdropPath: string;
  runtime: number;
  percentage: number;
};

const TitleWithProgress = (props: Props) => {
  return (
    <View style={styles.card}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.backdropPath}`,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          {borderRadius: Theme.titlePosterRadius},
        ]}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 8,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderRadius: 4,
          }}>
          <CustomText
            text="3h 18m"
            style={{color: 'white', fontSize: 12, opacity: 1}}
          />
        </View>
      </View>

      <ProgressIndicator percentage={props.percentage} />
    </View>
  );
};

export default TitleWithProgress;

const styles = StyleSheet.create({
  card: {
    aspectRatio: Theme.aspectRatios.horizontal,
    borderRadius: Theme.titlePosterRadius,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    gap: 5,
  },
});
