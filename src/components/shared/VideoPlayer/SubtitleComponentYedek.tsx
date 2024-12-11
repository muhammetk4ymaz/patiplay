import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../../utils/theme';
import {
  setCurrenSubtitle,
  setPaused,
  setSubtitles,
  setSubtitleUrls,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

const SubtitleComponent = (props: any) => {
  const dispatch = useAppDispatch();
  const buffering = useAppSelector(state => state.videoplayer.buffering);
  const progress = useAppSelector(state => state.videoplayer.progress);
  const subtitleUrls = useAppSelector(state => state.videoplayer.subtitleUrls);
  const subtitles = useAppSelector(state => state.videoplayer.subtitles);
  const currentSubtitle = useAppSelector(
    state => state.videoplayer.currentSubtitle,
  );
  const subtitleVisible = useAppSelector(
    state => state.videoplayer.subtitleVisible,
  );
  const subtitleIndex = useAppSelector(
    state => state.videoplayer.subtitleIndex,
  );

  useEffect(() => {
    const fetchSubtitleUrls = async () => {
      const subtitleUrls = [
        {
          uri: 'https://monsta.b-cdn.net/hls_outputs/subtitles_en.vtt',
          language: 'en',
        },
        {
          uri: 'https://monsta.b-cdn.net/hls_outputs/subtitles_fr.vtt',
          language: 'fr',
        },
      ];

      dispatch(setSubtitleUrls(subtitleUrls));
    };

    fetchSubtitleUrls();
  }, []);

  const fetchSubtitles = useCallback(async () => {
    dispatch(setPaused(true));
    try {
      const endpoint = subtitleUrls.find(
        subtitle => subtitle.language === subtitleUrls[subtitleIndex].language,
      )?.uri;

      if (endpoint !== undefined) {
        const vttResponse = await fetch(endpoint);

        const vttText = await vttResponse.text();

        const subtitles = parseWebVTT(vttText);

        dispatch(setSubtitles(subtitles));
        console.log(subtitles);
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
      {subtitleVisible && currentSubtitle && !buffering && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>{currentSubtitle}</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(SubtitleComponent);

const styles = StyleSheet.create({
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
