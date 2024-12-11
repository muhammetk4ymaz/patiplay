import React, {useCallback, useEffect, useRef} from 'react';
import {LogBox, StyleSheet, Text, View} from 'react-native';

import Video, {
  SelectedTrackType,
  SelectedVideoTrackType,
  VideoRef,
} from 'react-native-video';
import {Theme} from '../../../utils/theme';
import {
  setAudioTrackList,
  setBufferedDuration,
  setBuffering,
  setCurrenSubtitle,
  setPaused,
  setProgress,
  setQualityList,
  setQualitySettingsVisible,
  setSpeedSettingsVisible,
  setSubtitles,
  setSubtitleUrls,
  setTextTrackList,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import ModalComponent from '../Modal';
import VideoControllerComponent from './VideoControllerComponent';
import VideoQualityComponent from './VideoQualityComponent';
import VideoSpeedComponent from './VideoSpeedComponent';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const movieUrl: string =
  'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8';

const movieUrl2: string =
  'http://127.0.0.1:8000/media/hls_outputs/master_hls.m3u8';

const localmovieUrl: string =
  'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

export const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const {
    pressed,
    paused,
    buffering,
    audioTrack,
    speed,
    speedSettingsVisible,
    quality,
    qualitySettingsVisible,
    autoQuality,
    progress,
    subtitleUrls,
    textTrackList,
    subtitles,
    currentSubtitle,
    subtitleVisible,
    subtitleIndex,
  } = useAppSelector(state => state.videoplayer);

  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    const fetchSubtitleUrls = async () => {
      const response = await fetch(movieUrl);
      const m3u8Text = await response.text();

      const lines = m3u8Text.split('\n');

      const subtitleLines = lines.filter(line =>
        line.startsWith('#EXT-X-MEDIA:TYPE=SUBTITLES'),
      );

      const subtitles = subtitleLines.map(line => {
        const uri = getDetail(line, 'URI').replace(/"/g, '');
        const language = getDetail(line, 'LANGUAGE').replace(/"/g, '');
        return {uri, language};
      });

      dispatch(setSubtitleUrls(subtitles));
    };

    function getDetail(line: string, key: string): string {
      const match = new RegExp(`${key}=([^,]+)`).exec(line);
      return match ? match[1] : '';
    }

    fetchSubtitleUrls();
  }, []);

  const fetchSubtitles = useCallback(async () => {
    dispatch(setPaused(true));
    try {
      const endpoint = subtitleUrls.find(
        subtitle => subtitle.language === subtitleUrls[subtitleIndex].language,
      )?.uri;

      if (endpoint !== undefined) {
        const response = await fetch(
          `https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/${endpoint}`,
        );

        const m3u8Text = await response.text();

        const lines = m3u8Text
          .split('\n')
          .filter(line => line.endsWith('.vtt'));

        let combinedSubtitles = '';

        for (const vttFile of lines) {
          const vttResponse = await fetch(
            `https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/${vttFile}`,
          );

          const vttText = await vttResponse.text();
          combinedSubtitles += vttText + '\n';
        }

        const parsedSubtitles = parseWebVTT(combinedSubtitles);

        dispatch(setSubtitles(parsedSubtitles));
        dispatch(setPaused(false));
      }
    } catch (error) {
      console.error('Error fetching subtitles:', error);
      dispatch(setPaused(false));
    }
  }, [subtitleUrls, subtitleIndex]);

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
    const timeParts = timeStr.split(':');

    let hours = 0;
    let minutes, seconds;

    if (timeParts.length === 2) {
      [minutes, seconds] = timeParts;
    } else {
      [hours, minutes, seconds] = timeParts;
    }

    let sec,
      millis = 0;

    if (seconds.includes('.')) {
      [sec, millis] = seconds.split('.');
    } else {
      sec = seconds;
    }

    return (
      (parseInt(hours, 10) || 0) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(sec, 10) +
      (parseInt(millis, 10) || 0) / 1000
    );
  }, []);

  const parseWebVTT = (webVTTData: string) => {
    const lines = webVTTData.trim().split('\n');
    const subtitles = [];
    let subtitle = {start: 0, end: 0, text: ''};

    lines.forEach(line => {
      if (line.includes('-->')) {
        const [start, end] = line.split(' --> ');
        subtitle.start = timeToSeconds(start);
        subtitle.end = timeToSeconds(end);
        subtitle.text = '';
      } else if (line.trim() === '') {
        if (subtitle.text) {
          subtitles.push(subtitle);
        }
        subtitle = {start: 0, end: 0, text: ''};
      } else {
        subtitle.text += (subtitle.text ? '\n' : '') + line;
      }
    });

    // Push the last subtitle
    if (subtitle.text) {
      subtitles.push(subtitle);
    }

    const cleanSubtitles = subtitles.filter(item => item.start && item.end);

    return cleanSubtitles;
  };

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
            console.log('onLoad', data);

            if (data.audioTracks.length > 0) {
              dispatch(setAudioTrackList(data.audioTracks));
              // console.log('Audio tracks:', data.audioTracks);
            }
            if (data.textTracks.length > 0) {
              // console.log('Text tracks:', data.textTracks);
              dispatch(setTextTrackList(data.textTracks));
            }
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
            value: audioTrack,
          }}
          selectedTextTrack={{
            type: SelectedTrackType.INDEX,
            value: subtitleIndex,
          }}
          subtitleStyle={{
            opacity: 0,
            subtitlesFollowVideo: false,
          }}
          onProgress={prog => {
            dispatch(setProgress(prog));
            dispatch(setBufferedDuration(prog.playableDuration));
          }}
          style={styles.video}
        />

        <VideoControllerComponent videoRef={videoRef} />

        {subtitleVisible && currentSubtitle && !buffering && (
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
    textAlign: 'center',
    color: Theme.colors.white,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
