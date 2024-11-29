import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../store';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    uuid: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: true,
  user: {
    email: '',
    uuid: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<{email: string; uuid: string}>) => {
      state.user.email = action.payload.email;
      state.user.uuid = action.payload.uuid;
    },
  },
});

export const {login, logout} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export const loginAsync = () => (dispatch: AppDispatch) => {
  dispatch(login());
};

export const logoutAsync = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};

export const setUser =
  (email: string, uuid: string) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setUser({email, uuid}));
  };

export default authSlice.reducer;
