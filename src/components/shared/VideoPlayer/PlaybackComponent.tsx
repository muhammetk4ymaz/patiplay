import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {BackwardIcon, ForwardIcon} from '../../../../assets/icons';
import {setPaused} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

const playbackIconSize = 50;

const PlaybackComponent = (props: any) => {
  const paused = useAppSelector(state => state.videoplayer.paused);
  const progress = useAppSelector(state => state.videoplayer.progress);

  const dispatch = useAppDispatch();

  const handleForward = () => {
    props.videoRef?.current?.seek(progress?.currentTime + 10);
  };

  const handleBackward = () => {
    props.videoRef?.current?.seek(progress?.currentTime - 10);
  };

  console.log(PlaybackComponent.name, 'rendered');
  return (
    <View style={{flex: 1, paddingHorizontal: 12}}>
      <View style={styles.playbackControl}>
        <TouchableOpacity onPress={handleBackward}>
          <BackwardIcon size={50} />
        </TouchableOpacity>
        {paused ? (
          <TouchableOpacity
            onPress={() => {
              props.videoRef.current?.resume();
              dispatch(setPaused(false));
            }}>
            <IconIonicons name="play" size={playbackIconSize} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.videoRef.current?.pause();
              dispatch(setPaused(true));
            }}>
            <IconIonicons name="pause" size={playbackIconSize} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleForward}>
          <ForwardIcon size={playbackIconSize} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(PlaybackComponent);

const styles = StyleSheet.create({
  playbackControl: {
    position: 'absolute',
    width: 300,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
  },
});
