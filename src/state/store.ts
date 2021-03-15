import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { combineEpics, createEpicMiddleware }  from "redux-observable";
import breedEpic from 'state/epics/breedEpic';

const rootEpic = combineEpics(
  breedEpic
);

const epicMiddleware = createEpicMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), epicMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

// TODO: Type it right
epicMiddleware.run(rootEpic as any);


export default store;