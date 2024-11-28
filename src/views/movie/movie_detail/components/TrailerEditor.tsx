import {
  Dimensions,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import Video, {OnProgressData, VideoRef} from 'react-native-video';
import DeviceInfo from 'react-native-device-info';
import Slider from '@react-native-community/slider';
import {Theme} from '../../../../constants/Theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../../components/shared/CustomText';

const {width, height} = Dimensions.get('window');

type TrailerEditorProps = {
  backdropPath: string;
};

const TrailerEditor = (props: TrailerEditorProps) => {
  const [paused, setPaused] = React.useState(true);
  const [pressed, setPressed] = React.useState(false);
  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    const wait = new Promise(resolve => setTimeout(resolve, 1000));
    wait.then(() => {
      if (paused) {
        setPaused(false);
      }
    });
  }, []);

  const backdrop = {
    uri: `https://image.tmdb.org/t/p/w500${props.backdropPath}`,
  };

  const formatTime = useCallback((durationSeconds: number) => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
  }, []);

  const [progress, setProgress] = React.useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  return (
    <Pressable
      onPress={() => {
        setPressed(!pressed);
      }}
      style={[
        {
          height: DeviceInfo.isTablet() ? height * 0.6 : 200,
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'flex-end',
        },
      ]}>
      <Video
        paused={paused}
        poster={{
          source: {uri: backdrop.uri},
          resizeMode: 'cover',
        }}
        onProgress={e => setProgress(e)}
        source={require('../../../../../assets/CivilWar.mp4')}
        ref={videoRef}
        resizeMode="cover"
        repeat={true}
        // controls={true}
        style={StyleSheet.absoluteFillObject}
      />
      {!pressed && (
        <Slider
          step={0.1}
          thumbTintColor="transparent"
          value={progress.currentTime}
          maximumValue={progress.seekableDuration}
          minimumValue={0}
          minimumTrackTintColor={Theme.colors.primary}
          maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
          style={{
            bottom: Platform.select({ios:-18,android:0}),
            height: 10,
            marginLeft: Platform.select({ios: -3, android: -15}),
            marginRight: Platform.select({ios: -3, android: -15}),
          }}
        />
      )}
      {pressed && (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
              StyleSheet.absoluteFillObject,
            ]}>
            {paused ? (
              <TouchableOpacity
                style={{padding: 16}}
                onPress={() => {
                  videoRef.current?.resume();
                  setPaused(false);
                }}>
                <IconIonicons name="play" size={50} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{padding: 16}}
                onPress={() => {
                  videoRef.current?.pause();
                  setPaused(true);
                }}>
                <IconIonicons name="pause" size={50} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              width: '100%',
              alignItems: 'center',
            }}>
            <Slider
              step={0.1}
              thumbTintColor={Theme.colors.primary}
              value={progress.currentTime}
              maximumValue={progress.seekableDuration}
              minimumValue={0}
              onSlidingComplete={(value: number) => {
                videoRef.current?.seek(value);
              }}
              
              tapToSeek={true}
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor='rgba(255, 255, 255, 0.5)'
              style={{
                marginLeft: Platform.select({ios: -3 }),
                height: 40,
                flex: 1,
              }}
            />
            <CustomText
              text={formatTime(progress?.currentTime)}
              style={styles.remainingTime}
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default React.memo(TrailerEditor);

const styles = StyleSheet.create({
  remainingTime: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
