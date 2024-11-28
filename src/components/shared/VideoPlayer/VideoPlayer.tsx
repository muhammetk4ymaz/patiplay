import React, {useRef} from 'react';
import {LogBox, View} from 'react-native';
import {VideoRef} from 'react-native-video';
import {
  setQualitySettingsVisible,
  setSpeedSettingsVisible,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import ModalComponent from '../Modal';
import VideoControllerComponent from './VideoControllerComponent';
import VideoPlayerEditor from './VideoPlayerEditor';
import VideoQualityComponent from './VideoQualityComponent';
import VideoSpeedComponent from './VideoSpeedComponent';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const VideoPlayer = () => {
  console.log(VideoPlayer.name, 'rendered');

  const videoRef = useRef<VideoRef>(null);

  return (
    <View>
      <VideoPlayerEditor videoRef={videoRef} />
      <VideoControllerComponent videoRef={videoRef} />
      {/* <SubtitleComponent /> */}
      <ModalContent />
    </View>
  );
};

export default VideoPlayer;

const ModalContent = () => {
  const dispatch = useAppDispatch();
  const speedSettingsVisible = useAppSelector(
    state => state.videoplayer.speedSettingsVisible,
  );
  const qualitySettingsVisible = useAppSelector(
    state => state.videoplayer.qualitySettingsVisible,
  );
  return (
    <View>
      <ModalComponent
        modalVisible={speedSettingsVisible}
        children={<VideoSpeedComponent />}
        onDismiss={() => {
          dispatch(setSpeedSettingsVisible(false));
        }}
      />
      <ModalComponent
        modalVisible={qualitySettingsVisible}
        children={<VideoQualityComponent />}
        onDismiss={() => {
          dispatch(setQualitySettingsVisible(false));
        }}
      />
    </View>
  );
};
