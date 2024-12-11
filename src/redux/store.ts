import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import videoplayerReducer from './features/videoplayer/videoplayerSlice';
import interactionReducer from './features/interaction/interactionSlice';
import {searchReducer} from './features/search/searchSlice';
import {titleDetailSlice} from './features/titledetail/titleDetailSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    videoplayer: videoplayerReducer,
    interaction: interactionReducer,
    search: searchReducer,
    titleDetail: titleDetailSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
