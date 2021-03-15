import { Epic, combineEpics, ofType } from 'redux-observable'
import { from, of } from 'rxjs';
import { filter, map, mergeMap, catchError } from 'rxjs/operators'
import { ActionType, isActionOf } from "typesafe-actions";
import * as API from 'api/dogApi';
import { RootState } from 'state/rootReducer';
import * as actions from 'state/slices/breedSlice';
import {
  UserMessage,
  UserMessageType,
  setUserMessage
} from 'state/slices/userMessageSlice';

type ActionsType = ActionType<typeof actions>;

const fetchBreedListEpic: Epic<
ActionsType,
ActionsType,
RootState,
typeof API
> = (action$, store, { getBreedList }) => {
  action$.pipe(
    filter(isActionOf(actions.fetchBreedList)),
    mergeMap(action => {
      return from(getBreedList()).pipe(
        map(actions.fetchBreedListSuccess),
        catchError((e) => {
          // const message: UserMessage = {type: UserMessageType.error, message: e.message};
          // setUserMessage(message)
          return of(actions.fetchBreedListFailure())
        })
      );
    })
  );
}; 

const selectBreedEpic: Epic<
ActionsType,
ActionsType,
RootState,
typeof API
> = (action$, store, { getBreedPhotoList }) => {
  action$.pipe(
    filter(isActionOf(actions.selectBreed)),
    mergeMap(({payload}: {payload: string}) => 
      from(getBreedPhotoList(payload)).pipe(
        map(actions.fetchBreedPhotoListSuccess),
        catchError((e) => {
          // const message: UserMessage = {type: UserMessageType.error, message: e.message};
          // setUserMessage(message)
          return of(actions.fetchBreedPhotoListFailure());
        })
      )
    )
  )
};

export default combineEpics([
  fetchBreedListEpic,
  selectBreedEpic
]);
