import React from 'react';
import {StyleSheet} from 'react-native';
import Video, {
  SelectedTrackType,
  SelectedVideoTrackType,
} from 'react-native-video';
import {
  setAudioTrackList,
  setBufferedDuration,
  setBuffering,
  setProgress,
} from '../../../redux/features/videoplayer/videoplayerSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

const VideoPlayerEditor = (props: any) => {
  console.log(VideoPlayerEditor.name, 'rendered');
  const dispatch = useAppDispatch();

  const audioTrack = useAppSelector(state => state.videoplayer.audioTrack);
  const paused = useAppSelector(state => state.videoplayer.paused);
  const speed = useAppSelector(state => state.videoplayer.speed);
  const quality = useAppSelector(state => state.videoplayer.quality);
  const autoQuality = useAppSelector(state => state.videoplayer.autoQuality);
  const subtitleIndex = useAppSelector(
    state => state.videoplayer.subtitleIndex,
  );

  // const cdnmovieUrl: string =
  ('https://monsta.b-cdn.net/title/hls_outputs_title/master_hls.m3u8');

  const movieUrl: string =
    'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8';

  return (
    <Video
      source={{
        uri: movieUrl,
      }}
      ref={props.videoRef}
      paused={paused}
      resizeMode="stretch"
      repeat={true}
      volume={1.0}
      muted={false}
      rate={speed}
      audioOutput="speaker"
      onLoad={data => {
        console.log('onLoad', data);

        if (data.audioTracks.length > 0) {
          dispatch(setAudioTrackList(data.audioTracks));
          // console.log('Audio tracks:', data.audioTracks);
        }

        // if (data.videoTracks.length > 0) {
        //   const heightsSet = new Set();
        //   const uniqueVideoTracks = data.videoTracks.filter(track => {
        //     if (!heightsSet.has(track.height)) {
        //       heightsSet.add(track.height);
        //       return true;
        //     }
        //     return false;
        //   });

        //   dispatch(setQualityList(uniqueVideoTracks));
        // }
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
  );
};

export default VideoPlayerEditor;

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
  },
});
