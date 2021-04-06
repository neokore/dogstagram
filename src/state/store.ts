import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogicMiddleware } from 'redux-logic';
import rootReducer from './rootReducer';
import logic from './logic';

const logicMiddleware = createLogicMiddleware(logic);

const middleware = [...getDefaultMiddleware({ thunk: false }), logicMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware
});


export default store;