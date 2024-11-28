import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface VerificationState {
  inputEnabledList: boolean[];
}

const initialState: VerificationState = {
  inputEnabledList: [true, false, false, false, false, false],
};

export const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setInputEnabledList: (state, action: PayloadAction<boolean[]>) => {
      state.inputEnabledList = action.payload;
    },
  },
});

export const {setInputEnabledList} = verificationSlice.actions;

export const verificationReducer = verificationSlice.reducer;
