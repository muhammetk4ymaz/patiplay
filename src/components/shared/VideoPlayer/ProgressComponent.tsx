import React, {useCallback} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import CustomText from '../CustomText';

import Slider from '@react-native-community/slider';
import {Theme} from '../../../constants/Theme';
import {
  setPreviewPosition,
  setPreviewTime,
  setPreviewVisible,
} from '../../../redux/features/videoplayer/videoplayerSlice';

const ProgressComponent = (props: any) => {
  const progress = useAppSelector(state => state.videoplayer.progress);
  const previewVisible = useAppSelector(
    state => state.videoplayer.previewVisible,
  );
  const previewTime = useAppSelector(state => state.videoplayer.previewTime);
  const previewPosition = useAppSelector(
    state => state.videoplayer.previewPosition,
  );

  // console.log(ProgressComponent.name, 'rendered');

  const dispatch = useAppDispatch();

  const formatTime = useCallback((durationSeconds: number) => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
  }, []);

  return (
    <View>
      {previewVisible && (
        <View
          style={{
            gap: 5,
            marginBottom: 5,
          }}>
          {/* <Image
            source={require('../../../../assets/thumb.png')}
            resizeMode="cover"
            style={{
              height: 50,
              width: 100,
              left: previewPosition.x - 30,
            }}
          /> */}

          <CustomText
            text={formatTime(previewTime)}
            style={[
              styles.currentTime,
              {left: previewPosition.x},
            ]}></CustomText>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: Platform.select({ios: 10, android: 0}),
        }}>
        <CustomText
          text={formatTime(progress?.currentTime)}
          style={styles.previewTime}
        />
        <View style={{flex: 1}}>
          <Slider
            style={{
              zIndex: 1,
            }}
            step={0.1}
            minimumValue={0}
            maximumValue={progress?.seekableDuration}
            minimumTrackTintColor={Theme.colors.primary}
            maximumTrackTintColor={Theme.colors.lightgray}
            thumbTintColor={Theme.colors.primary}
            value={progress?.currentTime}
            tapToSeek={true}
            onValueChange={value => {
              dispatch(setPreviewTime(value));
            }}
            onSlidingComplete={value => {
              dispatch(setPreviewVisible(false));
              props.onSeek(value);
            }}
            onTouchStart={e => {
              dispatch(setPreviewVisible(true));
              const touchX = e.nativeEvent.pageX;
              dispatch(setPreviewPosition({x: touchX - 20}));
            }}
            onTouchMove={e => {
              dispatch(setPreviewVisible(true));
              const touchX = e.nativeEvent.pageX;
              dispatch(setPreviewPosition({x: touchX - 20}));
            }}
          />
          <Slider
            style={{
              position: 'absolute',
              width: '100%',
            }}
            minimumValue={0}
            maximumValue={progress?.seekableDuration}
            minimumTrackTintColor={Theme.colors.lightgray}
            maximumTrackTintColor={'gray'}
            thumbTintColor={'transparent'}
            value={progress?.playableDuration}
          />
        </View>
        <CustomText
          text={formatTime(progress?.seekableDuration - progress?.currentTime)}
          style={styles.remainingTime}
        />
      </View>
    </View>
  );
};

export default ProgressComponent;

const styles = StyleSheet.create({
  currentTime: {
    color: Theme.colors.white,
    fontWeight: 'bold',
  },
  remainingTime: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  previewTime: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
