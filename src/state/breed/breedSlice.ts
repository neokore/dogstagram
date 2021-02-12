import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed, getBreedList, getBreedPhotoList } from 'api/dogApi';
import { AppThunk } from 'state/store';

interface BreedState {
  isLoading: boolean,
  error: string | null,
  breedList: Breed[], // {id: "breed/subbreed", name: "breed (subbreed)"}
  selectedBreed?: string | null, // id from breedList
  breedPhotoList: string[]
};

const initialState = {
  isLoading: false,
  error: null,
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
      state.error = null;
    },
    fetchBreedListSuccess: (state, action: PayloadAction<Breed[]>) => {
      state.breedList = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchBreedListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedBreed: (state, action: PayloadAction<string>) => {
      state.selectedBreed = action.payload;
    },
    fetchBreedPhotoListStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBreedPhotoListSuccess: (state, action: PayloadAction<string[]>) => {
      state.breedPhotoList = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchBreedPhotoListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
    const breeds = await getBreedList();
    dispatch(fetchBreedListSuccess(breeds));
  } catch (err) {
    dispatch(fetchBreedListFailure(err));
  }
};

export const selectBreed = (breedId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setSelectedBreed(breedId));
    dispatch(fetchBreedPhotoListStart());
    const photoList = await getBreedPhotoList(breedId);
    dispatch(fetchBreedPhotoListSuccess(photoList));
  } catch (err) {
    dispatch(fetchBreedPhotoListFailure(err));
  }
};
