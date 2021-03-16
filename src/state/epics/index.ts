import { Epic, combineEpics } from 'redux-observable';
import { ActionsType } from 'state/slices';
import { RootState } from 'state/rootReducer';
import breedEpic from 'state/epics/breedEpic';
import * as API from 'api/dogApi';

export type EpicType = Epic<ActionsType, ActionsType, RootState, typeof API>;

const rootEpic = combineEpics(
  breedEpic
);

export default rootEpic;