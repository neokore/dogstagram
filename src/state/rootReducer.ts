import { combineReducers } from '@reduxjs/toolkit';
import breedReducer from './slices/breedSlice';
import userMessageReducer from './slices/userMessageSlice';

const rootReducer = combineReducers({
  breeds: breedReducer,
  userMessage: userMessageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;