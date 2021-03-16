import { combineEpics } from 'redux-observable'
import { from, of } from 'rxjs';
import { filter, map, exhaustMap, catchError } from 'rxjs/operators'
import { EpicType } from './';

import {
  fetchBreedList,
  fetchBreedListSuccess,
  fetchBreedListFailure,
  selectBreed,
  fetchBreedPhotoListSuccess,
  fetchBreedPhotoListFailure
} from 'state/slices/breedSlice';
import {
  UserMessage,
  UserMessageType,
  setUserMessage
} from 'state/slices/userMessageSlice';

const fetchBreedListEpic: EpicType = (action$, store, { getBreedList }) =>
  action$.pipe(
    filter(fetchBreedList.match),
    exhaustMap(action => {
      return from(getBreedList()).pipe(
        map(fetchBreedListSuccess),
        catchError((e) => {
          const message: UserMessage = {type: UserMessageType.error, message: e.message};
          return of(
            fetchBreedListFailure(),
            setUserMessage(message)
          );
        })
      );
    })
  ); 

const selectBreedEpic: EpicType = (action$, store, { getBreedPhotoList }) =>
  action$.pipe(
    filter(selectBreed.match),
    exhaustMap(({payload}: {payload: string}) => 
      from(getBreedPhotoList(payload)).pipe(
        map(fetchBreedPhotoListSuccess),
        catchError((e) => {
          const message: UserMessage = {type: UserMessageType.error, message: e.message};
          return of(
            fetchBreedPhotoListFailure(),
            setUserMessage(message)
          );
        })
      )
    )
  );

export default combineEpics(
  fetchBreedListEpic,
  selectBreedEpic
);
