import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../../utils/theme';
import {setSpeed} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import CustomText from '../CustomText';

interface VideoSpeed {
  speed: number;
  text: string;
}

const videoSpeeds: VideoSpeed[] = [
  {speed: 0.5, text: '0,5x'},
  {speed: 0.75, text: '0,75x'},
  {speed: 1, text: '1x(Normal)'},
  {speed: 1.25, text: '1,25x'},
  {speed: 1.5, text: '1,5x'},
];

const SpeedText = (props: any) => {
  return (
    <View
      style={[
        styles.item,
        {backgroundColor: props.selectedSpeed ? Theme.colors.primary : 'black'},
      ]}>
      <CustomText text={props.text} style={styles.itemText} />
    </View>
  );
};

const VideoSpeedComponent = () => {
  const dispatch = useAppDispatch();
  const speed = useAppSelector(state => state.videoplayer.speed);
  return videoSpeeds.map((videoSpeed, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        dispatch(setSpeed(videoSpeed.speed));
      }}>
      <SpeedText
        selectedSpeed={speed === videoSpeed.speed}
        text={videoSpeed.text}
      />
    </TouchableOpacity>
  ));
};

export default VideoSpeedComponent;

const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
  itemText: {
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
});
