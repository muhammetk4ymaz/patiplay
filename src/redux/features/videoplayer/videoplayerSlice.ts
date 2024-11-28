import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OnProgressData, VideoRef} from 'react-native-video';
import {VideoQuality} from '../../../components/shared/VideoPlayer/VideoQualityComponent';
import {AudioTrack} from '../../../components/shared/VideoPlayer/SubtitlesVoiceoverSettings';

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

export interface TextTrack {
  index: number;
  // title?: string;
  language?: string;
  // selected?: boolean;
}

export interface SubtitleUrl {
  uri: string;
  language: string;
}

export interface VideoPlayerState {
  video: string;
  isLoaded: boolean;
  pressed: boolean;
  paused: boolean;
  audioTrack: number;
  audioTrackList: AudioTrack[];
  speed: number;
  speedSettingsVisible: boolean;
  quality: number;
  qualitySettingsVisible: boolean;
  qualityList: VideoQuality[];
  autoQuality: boolean;
  progress: OnProgressData;
  subtitleIndex: number;
  textTrackList: TextTrack[];
  subtitleUrls: SubtitleUrl[];
  subtitles: Subtitle[];
  currentSubtitle: string;
  subtitleVisible: boolean;
  buffering: boolean;
  bufferedDuration: number;
  previewVisible: boolean;
  previewTime: number;
  previewPosition: {x: number};
}

const initialState: VideoPlayerState = {
  video: '',
  isLoaded: false,
  pressed: true,
  paused: false,
  audioTrack: 0,
  audioTrackList: [],
  speed: 1,
  speedSettingsVisible: false,
  quality: 0,
  qualitySettingsVisible: false,
  qualityList: [],
  autoQuality: true,
  progress: {
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  },
  subtitleUrls: [],
  subtitleIndex: 0,
  textTrackList: [
    // {
    //   index: 0,
    //   title: 'English',
    //   language: 'en',
    //   selected: true,
    // },
    // {
    //   index: 1,
    //   title: 'French',
    //   language: 'fr',
    //   selected: false,
    // },
  ],
  subtitles: [],
  currentSubtitle: '',
  subtitleVisible: true,
  buffering: true,
  bufferedDuration: 0,
  previewVisible: false,
  previewTime: 0,
  previewPosition: {x: 0},
};

export const videoplayerSlice = createSlice({
  name: 'videoplayer',
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
    setisLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    setPressed: (state, action: PayloadAction<boolean>) => {
      state.pressed = action.payload;
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    setAudioTrack: (state, action: PayloadAction<number>) => {
      state.audioTrack = action.payload;
    },
    setTextTrackList: (state, action: PayloadAction<TextTrack[]>) => {
      state.textTrackList = action.payload;
    },
    setAudioTrackList: (state, action: PayloadAction<AudioTrack[]>) => {
      state.audioTrackList = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setSpeedSettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.speedSettingsVisible = action.payload;
    },
    setQuality: (state, action: PayloadAction<number>) => {
      state.quality = action.payload;
    },
    setQualitySettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.qualitySettingsVisible = action.payload;
    },
    setAutoQuality: (state, action: PayloadAction<boolean>) => {
      state.autoQuality = action.payload;
    },
    setQualityList: (state, action: PayloadAction<VideoQuality[]>) => {
      state.qualityList = action.payload;
    },
    setProgress: (state, action: PayloadAction<OnProgressData>) => {
      state.progress = action.payload;
    },
    setSubtitleIndex: (state, action: PayloadAction<number>) => {
      state.subtitleIndex = action.payload;
    },
    setSubtitles: (state, action: PayloadAction<Subtitle[]>) => {
      state.subtitles = action.payload;
    },
    setSubtitleUrls: (state, action: PayloadAction<SubtitleUrl[]>) => {
      state.subtitleUrls = action.payload;
    },
    setCurrenSubtitle: (state, action: PayloadAction<string>) => {
      state.currentSubtitle = action.payload;
    },
    setSubtitleVisible: (state, action: PayloadAction<boolean>) => {
      state.subtitleVisible = action.payload;
    },
    setBuffering: (state, action: PayloadAction<boolean>) => {
      state.buffering = action.payload;
    },
    setBufferedDuration: (state, action: PayloadAction<number>) => {
      state.bufferedDuration = action.payload;
    },
    setPreviewVisible: (state, action: PayloadAction<boolean>) => {
      state.previewVisible = action.payload;
    },
    setPreviewTime: (state, action: PayloadAction<number>) => {
      state.previewTime = action.payload;
    },
    setPreviewPosition: (state, action: PayloadAction<{x: number}>) => {
      state.previewPosition = action.payload;
    },

    clearVideoPlayerState: state => {
      return initialState;
    },
  },
});

export const {
  setVideo,
  setPressed,
  setPaused,
  setAudioTrack,
  setAudioTrackList,
  setSpeed,
  setSpeedSettingsVisible,
  setQuality,
  setQualitySettingsVisible,
  setAutoQuality,
  setQualityList,
  setProgress,
  setTextTrackList,
  setSubtitleIndex,
  setSubtitles,
  setSubtitleUrls,
  setCurrenSubtitle,
  setSubtitleVisible,
  setBuffering,
  setBufferedDuration,
  setPreviewVisible,
  setPreviewTime,
  setPreviewPosition,
  clearVideoPlayerState,
  setisLoaded,
} = videoplayerSlice.actions;

export default videoplayerSlice.reducer;
