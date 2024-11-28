import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {Theme} from '../../../../constants/Theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Video, {OnProgressData, VideoRef} from 'react-native-video';
import Slider from '@react-native-community/slider';
import CustomText from '../../../../components/shared/CustomText';
import DeviceInfo from 'react-native-device-info';

type MoviePosterProps = {
  backdropPath: string;
};

const width = Dimensions.get('window').width;

const MoviePoster = (props: MoviePosterProps) => {
  const [paused, setPaused] = React.useState(true);

  useEffect(() => {
    const wait = new Promise(resolve => setTimeout(resolve, 1000));
    wait.then(() => {
      if (paused) {
        setPaused(false);
      }
    });
  }, []);

  const [progress, setProgress] = React.useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  const backdrop = {
    uri: `https://image.tmdb.org/t/p/w500${props.backdropPath}`,
  };

  const [pressed, setPressed] = React.useState(false);

  const videoRef = useRef<VideoRef>(null);

  const linearGradientColors = [
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0.3)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 1)',
  ];

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
    <Pressable
      onPress={() => {
        setPressed(!pressed);
      }}
      style={[
        {
          // marginTop: headerHeight,
          height: DeviceInfo.isTablet()
            ? Dimensions.get('window').height * 0.6
            : Dimensions.get('window').height * 0.3,
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
          maximumTrackTintColor="white"
          style={{
            height: 10,
            marginLeft: Platform.select({ios: 0, android: -15}),
            marginRight: Platform.select({ios: 0, android: -15}),
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
              minimumTrackTintColor={Theme.colors.primary}
              maximumTrackTintColor="white"
              style={{
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

  // return (
  //   <View
  //     style={{
  //       height: 420,
  //     }}>
  //     <View style={StyleSheet.absoluteFillObject}>
  //       <Image
  //         source={backdrop}
  //         width={width}
  //         style={StyleSheet.absoluteFillObject}
  //         blurRadius={2}
  //       />
  //       <Pressable
  //         style={{
  //           marginTop: headerHeight,
  //           alignItems: 'center',
  //         }}
  //         onPress={() => {
  //           navigation.navigate('Movie');
  //         }}>
  //         <View
  //           style={{
  //             position: 'absolute',
  //             width: width - 36,
  //             height: '100%',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           <View
  //             style={{
  //               padding: 8,
  //               backgroundColor: 'rgba(245, 245, 245, 0.3)',
  //               borderRadius: 50,
  //               borderWidth: 1,
  //               borderColor: Theme.colors.white,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               zIndex: 1,
  //             }}>
  //             <IconIonicons name="play" size={28} color="white" />
  //           </View>
  //         </View>
  //         <Image source={backdrop} style={styles.backDrop} />
  //       </Pressable>
  //     </View>

  //     <LinearGradient
  //       colors={linearGradientColors}
  //       style={styles.linearGradient}
  //     />
  //   </View>
  // );
};

export default React.memo(MoviePoster);

const styles = StyleSheet.create({
  backDrop: {
    paddingHorizontal: 18,
    marginBottom: 5,
    marginTop: 4,
    width: width - 36,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
  },
  remainingTime: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
