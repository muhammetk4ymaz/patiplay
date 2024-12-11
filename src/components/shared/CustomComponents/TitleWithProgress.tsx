import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import ProgressIndicator from '../ProgressIndicator';
import {background} from 'native-base/lib/typescript/theme/styled-system';

type Props = {
  backdropPath: Source;
  runtime: number;
  percentage: number;
  progressColor?: ['#080808', '#080808'] | ['#8b5cf6', '#a855f7'];
};

const TitleWithProgress = (props: Props) => {
  return (
    <View style={styles.card}>
      <FastImage
        source={props.backdropPath}
        resizeMode="contain"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: Theme.titlePosterRadius,
            backgroundColor: Theme.colors.primary,
          },
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
            text={formatDuration(props.runtime)}
            style={{color: 'white', fontSize: 12, opacity: 1}}
          />
        </View>
      </View>

      <ProgressIndicator
        percentage={props.percentage}
        progressColor={props.progressColor}
      />
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

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }

  if (hours === 0 || minutes === 0) {
    if (remainingSeconds !== 0) {
      formattedTime += `${remainingSeconds}s`;
    }
  }

  return formattedTime.trim();
}
