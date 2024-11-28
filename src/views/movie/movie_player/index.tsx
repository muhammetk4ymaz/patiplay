import {
  ActivityIndicator,
  Dimensions,
  ScaledSize,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Theme} from '../../../constants/Theme';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import IconFeather from 'react-native-vector-icons/Feather';

import {
  setInteractionSectionVisible,
  setReplySectionVisible,
} from '../../../redux/features/interaction/interactionSlice';
import VideoPlayer from '../../../components/shared/VideoPlayer/VideoPlayer';
import InteractionSection from './components/InteractionSection';
import InteractionInputs from './components/InteractionInputs';

const height = Dimensions.get('window').width;

const MovieView = () => {
  const [dimensions, setDimensions] = useState<ScaledSize>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const videoWidth = useSharedValue(100);
  const chatContainerWidth = useSharedValue(0);
  const chatContainerOpacity = useSharedValue(0);
  const dispatch = useAppDispatch();

  const videoAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${videoWidth.value}%`,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${chatContainerWidth.value}%`,
      opacity: chatContainerOpacity.value,
    };
  });

  const toggleBottomSheet = () => {
    if (chatContainerWidth.value === 0) {
      videoWidth.value = withTiming(60);
      chatContainerWidth.value = withTiming(40);
      chatContainerOpacity.value = withTiming(1, {duration: 1200});
      dispatch(setInteractionSectionVisible(true));
    } else {
      videoWidth.value = withTiming(100);
      chatContainerWidth.value = withTiming(0);
      chatContainerOpacity.value = withTiming(0, {duration: 150});
      dispatch(setReplySectionVisible(false));
      dispatch(setInteractionSectionVisible(false));
    }
  };

  console.log(MovieView.name);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={Theme.colors.primary} />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          {
            minHeight: height,
          },
        ]}>
        <StatusBar hidden={true} />

        <Animated.View style={videoAnimatedStyle}>
          <VideoPlayer />
          <InteractionButton onPress={toggleBottomSheet} />
        </Animated.View>
        <Animated.View
          style={[containerAnimatedStyle, {backgroundColor: 'black'}]}>
          <InteractionSection />
        </Animated.View>
        <InteractionInputs />
      </View>
    );
  }
};

export default MovieView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
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
          position: 'absolute',
          right: 0,
          top: 0,
        }}>
        <IconFeather name="message-circle" size={24} color={'white'} />
      </TouchableOpacity>
    )
  );
};
