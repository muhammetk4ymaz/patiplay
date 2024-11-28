import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import TopMovie from '../../../models/top_movie';

interface TitleDetailState {
  episodes: TopMovie[];
  episodesInitialLoading: boolean;
  clips: TopMovie[];
  clipsInitialLoading: boolean;
  trailers: TopMovie[];
  trailersInitialLoading: boolean;
  comments: any[];
  commentsInitialLoading: boolean;
  discussions: any[];
  discussionsInitialLoading: boolean;
  recommmendaions: any[];
  recommmendaionsInitialLoading: boolean;
  lists: any[];
  listsInitialLoading: boolean;
  fans: any[];
  fansInitialLoading: boolean;
  casts: any[];
  castsInitialLoading: boolean;
  crew: any[];
  crewInitialLoading: boolean;
  languages: any[];
  languagesInitialLoading: boolean;
  related: any[];
  relatedInitialLoading: boolean;
}

const initialState: TitleDetailState = {
  episodes: [],
  episodesInitialLoading: true,
  clips: [],
  clipsInitialLoading: true,
  trailers: [],
  trailersInitialLoading: true,
  comments: [],
  commentsInitialLoading: true,
  discussions: [],
  discussionsInitialLoading: true,
  recommmendaions: [],
  recommmendaionsInitialLoading: true,
  lists: [],
  listsInitialLoading: true,
  fans: [],
  fansInitialLoading: true,
  casts: [],
  castsInitialLoading: true,
  crew: [],
  crewInitialLoading: true,
  languages: [],
  languagesInitialLoading: true,
  related: [],
  relatedInitialLoading: true,
};

export const titleDetailSlice = createSlice({
  name: 'titleDetail',
  initialState: initialState,
  reducers: {
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
      state.episodesInitialLoading = false;
    },
    setClips: (state, action) => {
      state.clips = action.payload;
      state.clipsInitialLoading = false;
    },
    setTrailers: (state, action) => {
      state.trailers = action.payload;
      state.trailersInitialLoading = false;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
      state.commentsInitialLoading = false;
    },
    setDiscussions: (state, action) => {
      state.discussions = action.payload;
      state.discussionsInitialLoading = false;
    },
    setRecommmendaions: (state, action) => {
      state.recommmendaions = action.payload;
      state.recommmendaionsInitialLoading = false;
    },
    setList: (state, action) => {
      state.lists = action.payload;
      state.listsInitialLoading = false;
    },
    setFans: (state, action) => {
      state.fans = action.payload;
      state.fansInitialLoading = false;
    },
    setCasts: (state, action) => {
      state.casts = action.payload;
      state.castsInitialLoading = false;
    },
    setCrew: (state, action) => {
      state.crew = action.payload;
      state.crewInitialLoading = false;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
      state.languagesInitialLoading = false;
    },
    setRelated: (state, action) => {
      state.related = action.payload;
      state.relatedInitialLoading = false;
    },
  },
});

export const {
  setEpisodes,
  setClips,
  setTrailers,
  setComments,
  setDiscussions,
  setRecommmendaions,
  setList,
  setFans,
  setCasts,
  setCrew,
  setLanguages,
  setRelated,
} = titleDetailSlice.actions;

export default titleDetailSlice.reducer;
