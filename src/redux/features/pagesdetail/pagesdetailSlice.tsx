import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export interface PageDetailState {
  crewDiscussionReplyVisible: boolean;
}

const initialState: PageDetailState = {
  crewDiscussionReplyVisible: false,
};

export const pagedetailSlice = createSlice({
  name: 'pagedetail',
  initialState,
  reducers: {},
});

export const {} = pagedetailSlice.actions;

export default pagedetailSlice.reducer;
