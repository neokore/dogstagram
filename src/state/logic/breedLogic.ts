import { PayloadAction } from '@reduxjs/toolkit';
import { getBreedList, getBreedPhotoList } from 'api/dogApi';
import { createLogic } from 'redux-logic';
import {
  fetchBreedList,
  fetchBreedListSuccess,
  fetchBreedListFailure,
  selectBreed,
  fetchBreedPhotoListSuccess,
  fetchBreedPhotoListFailure
} from 'state/slices/breedSlice';
import { clearUserMessage, setUserMessage, UserMessage, UserMessageType } from 'state/slices/userMessageSlice';

const fetchBreedListLogic = createLogic({
  type: fetchBreedList,
  latest: true,
  async process(depObj, dispatch, done) {
    try {
      const breeds = await getBreedList();
      dispatch(fetchBreedListSuccess(breeds));
    } catch (err) {
      dispatch(fetchBreedListFailure());
      dispatch(setUserMessage({type: UserMessageType.error, message: err.message} as UserMessage));
    }
    done();
  }
});

const fetchBreedPhotoListLogic = createLogic({
  type: selectBreed,
  latest: true,
  async process({ action }: {action : PayloadAction<string>}, dispatch, done) {
    try {
      dispatch(clearUserMessage());
      const photoList = await getBreedPhotoList(action.payload);
      dispatch(fetchBreedPhotoListSuccess(photoList));
    } catch (err) {
      dispatch(fetchBreedPhotoListFailure());
      dispatch(setUserMessage({type: UserMessageType.error, message: err.message} as UserMessage));
    }
    done();
  }
});

const breedLogic = [
  fetchBreedListLogic,
  fetchBreedPhotoListLogic
];

export default breedLogic;