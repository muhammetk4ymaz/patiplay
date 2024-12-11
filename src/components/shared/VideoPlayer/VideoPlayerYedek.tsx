import React, {useCallback, useEffect, useRef} from 'react';
import {LogBox, StyleSheet, Text, View} from 'react-native';

import Video, {
  SelectedTrackType,
  SelectedVideoTrackType,
  VideoRef,
} from 'react-native-video';
import {Theme} from '../../../utils/theme';
import {
  setBufferedDuration,
  setBuffering,
  setCurrenSubtitle,
  setProgress,
  setQualityList,
  setQualitySettingsVisible,
  setSpeedSettingsVisible,
  setSubtitles,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import ModalComponent from '../Modal';
import VideoControllerComponent from './VideoControllerComponent';
import VideoQualityComponent from './VideoQualityComponent';
import VideoSpeedComponent from './VideoSpeedComponent';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

// const movieUrl = 'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8';
// const movieUrl: string =
('http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8');
// const movieUrl: string = 'https://media.w3.org/2010/05/sintel/trailer.mp4';
// const movieUrl: string =
('https://cdn.media.ccc.de/congress/2019/h264-sd/36c3-10496-deu-eng-spa-Das_Mauern_muss_weg_sd.mp4');
// const movieUrl: string =
('https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8');
// const movieUrl: string = require('../../../assets/BigBuckBunny.mp4');

const movieUrl: string = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const subtitles_en = 'subtitles_en';
const subtitles_de = 'subtitles_de';
const subtitles_fr = 'subtitles_fr';
const subtitles_es = 'subtitles_es';

export const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const {
    pressed,
    paused,
    speed,
    speedSettingsVisible,
    quality,
    qualitySettingsVisible,
    autoQuality,
    progress,
    subtitles,
    currentSubtitle,
    subtitleVisible,
  } = useAppSelector(state => state.videoplayer);

  const videoRef = useRef<VideoRef>(null);

  const fetchSubtitles = useCallback(async () => {
    try {
      const response = await fetch(
        `https://bitdash-a.akamaihd.net/content/sintel/subtitles/${subtitles_es}.vtt`,
      );
      const text = await response.text();
      const parsedSubtitles = parseVTT(text);
      dispatch(setSubtitles(parsedSubtitles));
    } catch (error) {
      console.error('Error fetching subtitles:', error);
    }
  }, []);

  useEffect(() => {
    fetchSubtitles();
  }, [fetchSubtitles]);

  useEffect(() => {
    if (subtitles.length > 0) {
      const subtitle = subtitles.find(
        sub =>
          progress.currentTime >= sub.start && progress.currentTime <= sub.end,
      );
      dispatch(setCurrenSubtitle(subtitle?.text || ''));
    }
  }, [progress.currentTime, subtitles]);

  const timeToSeconds = useCallback((timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(':');
    const [sec, millis] = seconds.split('.');
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(sec, 10) +
      (parseInt(millis, 10) || 0) / 1000
    );
  }, []);

  const parseVTT = useCallback(
    (vtt: string) => {
      const lines = vtt
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');

      const subtitles = [];
      let subtitle = {start: 0, end: 0, text: ''};

      lines.forEach(line => {
        if (/^\d+$/.test(line)) {
          if (subtitle.text) {
            subtitles.push(subtitle);
            subtitle = {start: 0, end: 0, text: ''};
          }
        } else if (/^\d{2}:\d{2}:\d{2}/.test(line)) {
          const [start, end] = line.split(' --> ');
          subtitle.start = timeToSeconds(start.trim());
          subtitle.end = timeToSeconds(end.trim());
        } else {
          subtitle.text =
            (subtitle.text ? subtitle.text + ' ' : '') + line.trim();
        }
      });

      if (subtitle.text) {
        subtitles.push(subtitle);
      }

      return subtitles;
    },
    [timeToSeconds],
  );

  return (
    <View>
      <View>
        <Video
          source={{
            uri: movieUrl,
          }}
          ref={videoRef}
          resizeMode="cover"
          repeat={true}
          volume={1.0}
          muted={false}
          rate={speed}
          audioOutput="speaker"
          paused={paused}
          onLoad={data => {
            console.log('Video loaded:', data.textTracks);
            if (data.videoTracks.length > 0) {
              const heightsSet = new Set();
              const uniqueVideoTracks = data.videoTracks.filter(track => {
                if (!heightsSet.has(track.height)) {
                  heightsSet.add(track.height);
                  return true;
                }
                return false;
              });

              dispatch(setQualityList(uniqueVideoTracks));
            }
          }}
          onBuffer={data => dispatch(setBuffering(data.isBuffering))}
          selectedVideoTrack={
            autoQuality
              ? {
                  type: SelectedVideoTrackType.AUTO,
                }
              : {
                  type: SelectedVideoTrackType.INDEX,
                  value: quality,
                }
          }
          selectedAudioTrack={{
            type: SelectedTrackType.INDEX,
            value: 0,
          }}
          selectedTextTrack={{
            type: SelectedTrackType.INDEX,
            value: 1,
          }}
          subtitleStyle={{
            opacity: 0,
          }}
          onProgress={prog => {
            dispatch(setProgress(prog));
            dispatch(setBufferedDuration(prog.playableDuration));
          }}
          style={styles.video}
        />

        <VideoControllerComponent videoRef={videoRef} />

        {subtitleVisible && currentSubtitle && (
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{currentSubtitle}</Text>
          </View>
        )}
      </View>
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

var styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
  },

  subtitleContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  subtitleText: {
    color: Theme.colors.white,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
