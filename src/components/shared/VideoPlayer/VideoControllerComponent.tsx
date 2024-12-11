import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  clearInteractionState,
  setInteractionSectionVisible,
} from '../../../redux/features/interaction/interactionSlice';
import {
  clearVideoPlayerState,
  setPressed,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {Theme} from '../../../utils/theme';
import PlaybackComponent from './PlaybackComponent';
import ProgressComponent from './ProgressComponent';
import VideoOptionsComponent from './VideoOptionsComponent';

const VideoControllerComponent = (props: any) => {
  const navigation = useNavigation();
  const pressed = useAppSelector(state => state.videoplayer.pressed);
  const buffering = useAppSelector(state => state.videoplayer.buffering);
  const interactionSectionVisible = useAppSelector(
    state => state.interaction.interactionSectionVisible,
  );

  const dispatch = useAppDispatch();

  console.log(VideoControllerComponent.name, 'rendered');
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: pressed ? 'rgba(0,0,0,0.5)' : 'transparent',
      }}>
      <Pressable
        onPress={() => {
          dispatch(setPressed(!pressed));
        }}
        style={{flex: 1}}>
        {pressed && (
          <View
            style={{
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
            <InteractionButton
              onPress={() => {
                console.log('pressed');
                dispatch(
                  setInteractionSectionVisible(!interactionSectionVisible),
                );
              }}
            />
          </View>
        )}

        {!buffering ? (
          pressed && <PlaybackComponent videoRef={props.videoRef} />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={Theme.colors.primary} size={'large'} />
          </View>
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
    </SafeAreaView>
  );
};

export default React.memo(VideoControllerComponent);

const styles = StyleSheet.create({
  controlContainer: {
    height: '100%',
    width: '100%',
  },
  progressContanier: {
    bottom: 0,
    width: '100%',
  },
});

const InteractionButton = ({onPress}: {onPress: () => void}) => {
  const pressed = useAppSelector(state => state.videoplayer.pressed);
  return (
    pressed && (
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 16,
        }}>
        <IconFeather name="message-circle" size={24} color={'white'} />
      </TouchableOpacity>
    )
  );
};
