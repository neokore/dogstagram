import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { createEpicMiddleware }  from "redux-observable";
import { ActionsType } from './slices';
import rootEpic from './epics';
import * as API from 'api/dogApi';

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, RootState>({
  dependencies: API,
});
const middleware = [...getDefaultMiddleware({ thunk: false }), epicMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

epicMiddleware.run(rootEpic);


export default store;