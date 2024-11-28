import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface InteractionState {
  interactionSectionVisible: boolean;
  chatInputVisible: boolean;
  chatInputText: string;
  replySectionVisible: boolean;
  replyInputVisible: boolean;
  replyInputText: string;
  commentInputText: string;
  commentInputVisible: boolean;
}

const initialState: InteractionState = {
  interactionSectionVisible: false,
  chatInputVisible: false,
  chatInputText: '',
  replySectionVisible: false,
  replyInputVisible: false,
  replyInputText: '',
  commentInputText: '',
  commentInputVisible: false,
};

export const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setInteractionSectionVisible: (state, action: PayloadAction<boolean>) => {
      state.interactionSectionVisible = action.payload;
    },
    setChatInputVisible: (state, action: PayloadAction<boolean>) => {
      state.chatInputVisible = action.payload;
    },
    setChatInputText: (state, action: PayloadAction<string>) => {
      state.chatInputText = action.payload;
    },
    setReplySectionVisible: (state, action: PayloadAction<boolean>) => {
      state.replySectionVisible = action.payload;
    },
    setReplyInputVisible: (state, action: PayloadAction<boolean>) => {
      state.replyInputVisible = action.payload;
    },
    setCommentInputVisible: (state, action: PayloadAction<boolean>) => {
      state.commentInputVisible = action.payload;
    },
    setReplyInputText: (state, action: PayloadAction<string>) => {
      state.replyInputText = action.payload;
    },
    setCommentInputText: (state, action: PayloadAction<string>) => {
      state.commentInputText = action.payload;
    },
    clearInteractionState: state => {
      return initialState;
    },
  },
});

export const {
  setInteractionSectionVisible,
  setChatInputVisible,
  setChatInputText,
  setReplySectionVisible,
  setReplyInputVisible,
  setCommentInputVisible,
  setReplyInputText,
  setCommentInputText,
  clearInteractionState,
} = interactionSlice.actions;

export default interactionSlice.reducer;
