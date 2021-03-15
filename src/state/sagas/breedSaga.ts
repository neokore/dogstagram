import { all, call, takeLatest, put } from 'redux-saga/effects'
import { Breed, getBreedList, getBreedPhotoList } from 'api/dogApi';
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

function* fetchBreedListSaga() {
  try {
    const breeds: Breed[] = yield call(getBreedList);
    yield put(fetchBreedListSuccess(breeds));
  } catch (e) {
    const message: UserMessage = {type: UserMessageType.error, message: e.message};
    yield all([
      put(fetchBreedListFailure()),
      put(setUserMessage(message))
    ]);
  }
}

function* selectBreedSaga({payload}: {payload: string}) {
  try {
    const photoList: string[] = yield call(getBreedPhotoList, payload);
    yield put(fetchBreedPhotoListSuccess(photoList));
  } catch (e) {
    const message: UserMessage = {type: UserMessageType.error, message: e.message};
    yield all([
      put(fetchBreedPhotoListFailure()),
      put(setUserMessage(message))
    ]);
  }
}

function* breedSaga() {
  yield takeLatest(fetchBreedList, fetchBreedListSaga);
  yield takeLatest(selectBreed, selectBreedSaga);
}

export default breedSaga;