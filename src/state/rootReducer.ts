import { combineReducers } from '@reduxjs/toolkit';
import breedReducer from './breed/breedSlice';

const rootReducer = combineReducers({
  breeds: breedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;