import React, { Suspense } from 'react';
import { render, screen } from 'test-utils';
import BreedSelector from './BreedSelector';
import { BreedState } from 'state/slices/breedSlice';

test('renders the none list option', () => {
  render(
    <Suspense fallback="loading">
      <BreedSelector />
    </Suspense>
  );
  const selectElement = screen.getByText(/breedSelector.None/i);
  expect(selectElement).toBeInTheDocument();
});

test('renders loading while fetching', () => {
  const options = {
    initialState: {
      breeds: {
        isLoading: true,
        breedList: [],
        breedPhotoList: [],
        selectedBreed: null
      } as BreedState
    }
  };
  render(
    <Suspense fallback="loading">
      <BreedSelector />
    </Suspense>,
    options
  );
  const selectElement = screen.getByText(/breedSelector.Loading/i);
  expect(selectElement).toBeInTheDocument();
});

test('renders the breeds list', () => {
  const options = {
    initialState: {
      breeds: {
        isLoading: false,
        breedList: [
          { id: 'breed1', name: 'Breed1' },
          { id: 'breed2', name: 'Breed2' }
        ],
        breedPhotoList: [],
        selectedBreed: null
      } as BreedState
    }
  };

  render(
    <Suspense fallback="loading">
      <BreedSelector />
    </Suspense>,
    options    
  );
  const breed1Element = screen.getByText(/Breed1/i);
  expect(breed1Element).toBeInTheDocument();
  const breed2Element = screen.getByText(/Breed2/i);
  expect(breed2Element).toBeInTheDocument();
});
