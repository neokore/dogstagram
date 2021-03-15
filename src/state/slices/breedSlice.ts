import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed } from 'api/dogApi';

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
    fetchBreedList: (state) => {
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
    selectBreed: (state, action: PayloadAction<string>) => {
      state.selectedBreed = action.payload;
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
  fetchBreedList,
  fetchBreedListSuccess,
  fetchBreedListFailure,
  selectBreed,
  fetchBreedPhotoListSuccess,
  fetchBreedPhotoListFailure
} = breedSlice.actions;
