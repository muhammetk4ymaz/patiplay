import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../../constants/Theme';
import {
  setCurrenSubtitle,
  setPaused,
  setSubtitles,
  setSubtitleUrls,
  setTextTrackList,
  TextTrack,
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
      const response = await fetch(
        'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8',
      );
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

      console.log('subtitles:', subtitles);

      const textTracks: TextTrack[] = [];

      subtitles.forEach((subtitle, index) => {
        const textTrack: TextTrack = {
          index: index,
          language: subtitle.language,
        };
        textTracks.push(textTrack);
        console.log('textTrack:', textTrack);
      });
      dispatch(setTextTrackList(textTracks));

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
