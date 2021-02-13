import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum UserMessageType {
  error = "ERROR",
  info = "INFO"
};

export interface UserMessage {
  type: UserMessageType | null,
  message: string | null
};

const initialState = {
  type: null,
  message: null
} as UserMessage;

const userMessageSlice = createSlice({
  name: 'userMessage',
  initialState,
  reducers: {
    setUserMessage: (state, action: PayloadAction<UserMessage>) => {
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
    },
    clearUserMessage: (state) => {
      state.type = null;
      state.message = null;
    }
  }
});

export default userMessageSlice.reducer;
export const {
  setUserMessage,
  clearUserMessage
} = userMessageSlice.actions;