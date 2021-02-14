import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed, getBreedList, getBreedPhotoList } from 'api/dogApi';
import { AppThunk } from 'state/store';
import { UserMessage, UserMessageType, clearUserMessage, setUserMessage } from './userMessageSlice';

export interface BreedState {
  isLoading: boolean,
  breedList: Breed[], // {id: "breed/subbreed", name: "breed (subbreed)"}
  selectedBreed?: string | null, // id from breedList
  breedPhotoList: string[]
};

const initialState = {
  isLoading: false,
  breedList: [],
  selectedBreed: null,
  breedPhotoList: []
} as BreedState;

const breedSlice = createSlice({
  name: 'breed',
  initialState,
  reducers: {
    fetchBreedListStart: (state) => {
      state.isLoading = true;
      state.breedList = [];
      state.breedPhotoList = [];
    },
    fetchBreedListSuccess: (state, action: PayloadAction<Breed[]>) => {
      state.breedList = action.payload;
      state.isLoading = false;
    },
    fetchBreedListFailure: (state) => {
      state.isLoading = false;
      state.breedList = [];
    },
    setSelectedBreed: (state, action: PayloadAction<string>) => {
      state.selectedBreed = action.payload;
    },
    fetchBreedPhotoListStart: (state) => {
      state.isLoading = true;
      state.breedPhotoList = [];
    },
    fetchBreedPhotoListSuccess: (state, action: PayloadAction<string[]>) => {
      state.breedPhotoList = action.payload;
      state.isLoading = false;
    },
    fetchBreedPhotoListFailure: (state) => {
      state.isLoading = false;
      state.breedPhotoList = []
    }
  }
});

export default breedSlice.reducer;

export const { 
  fetchBreedListStart,
  fetchBreedListSuccess,
  fetchBreedListFailure,
  setSelectedBreed,
  fetchBreedPhotoListStart,
  fetchBreedPhotoListSuccess,
  fetchBreedPhotoListFailure
} = breedSlice.actions;

export const fetchBreedList = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchBreedListStart());
    dispatch(clearUserMessage());
    const breeds = await getBreedList();
    dispatch(fetchBreedListSuccess(breeds));
  } catch (err) {
    dispatch(fetchBreedListFailure());
    dispatch(setUserMessage({type: UserMessageType.error, message: err.message} as UserMessage));
  }
};

export const selectBreed = (breedId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setSelectedBreed(breedId));
    dispatch(fetchBreedPhotoListStart());
    dispatch(clearUserMessage());
    const photoList = await getBreedPhotoList(breedId);
    dispatch(fetchBreedPhotoListSuccess(photoList));
  } catch (err) {
    dispatch(fetchBreedPhotoListFailure());
    dispatch(setUserMessage({type: UserMessageType.error, message: err.message} as UserMessage));
  }
};
