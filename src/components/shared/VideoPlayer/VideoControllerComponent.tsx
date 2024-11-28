import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Theme} from '../../../constants/Theme';
import {clearInteractionState} from '../../../redux/features/interaction/interactionSlice';
import {
  clearVideoPlayerState,
  setPressed,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import PlaybackComponent from './PlaybackComponent';
import ProgressComponent from './ProgressComponent';
import VideoOptionsComponent from './VideoOptionsComponent';

const VideoControllerComponent = (props: any) => {
  const navigation = useNavigation();
  const pressed = useAppSelector(state => state.videoplayer.pressed);
  const buffering = useAppSelector(state => state.videoplayer.buffering);

  const dispatch = useAppDispatch();

  console.log(VideoControllerComponent.name, 'rendered');
  return (
    <Pressable
      onPress={() => {
        dispatch(setPressed(!pressed));
      }}
      style={[
        styles.controlContainer,
        {
          backgroundColor: pressed ? 'rgba(0,0,0,0.5)' : 'transparent',
        },
      ]}>
      {pressed && (
        <View
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(clearVideoPlayerState());
              dispatch(clearInteractionState());

              navigation.goBack();
            }}
            style={{
              padding: 16,
            }}>
            <IconFontAwesome6 name="arrow-left" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      )}

      {!buffering ? (
        pressed && <PlaybackComponent videoRef={props.videoRef} />
      ) : (
        <ActivityIndicator color={Theme.colors.primary} size={'large'} />
      )}

      {pressed && (
        <Pressable onPress={() => {}} style={styles.progressContanier}>
          <ProgressComponent
            onSeek={(value: number) => {
              props.videoRef.current?.seek(value);
            }}
          />
          <VideoOptionsComponent />
        </Pressable>
      )}
    </Pressable>
  );
};

export default React.memo(VideoControllerComponent);

const styles = StyleSheet.create({
  controlContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  progressContanier: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
