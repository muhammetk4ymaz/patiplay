import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import TopMovie from '../../../models/top_movie';
import nowPlayMovies from '../../../models/now_play_movies';

export interface SearchState {
  searchFilterVisible: boolean;
  searchList: TopMovie[];
}

const initialState: SearchState = {
  searchFilterVisible: false,
  searchList: nowPlayMovies,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchFilterVisible: (state, action: PayloadAction<boolean>) => {
      state.searchFilterVisible = action.payload;
    },
    setSearchList: (state, action: PayloadAction<TopMovie[]>) => {
      state.searchList = action.payload;
    },
  },
});

export const {setSearchFilterVisible, setSearchList} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
