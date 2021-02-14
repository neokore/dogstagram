import React, { Suspense } from 'react';
import { render, screen } from 'test-utils';
import PhotoViewSlide from './PhotoViewSlide';
import { BreedState } from 'state/slices/breedSlice';

test('renders image list', () => {
  const options = {
    initialState: {
      breeds: {
        isLoading: false,
        breedList: [],
        breedPhotoList: [
          'img1.jpg',
          'img2.jpg'
        ],
        selectedBreed: 'breed1'
      } as BreedState
    }
  };
  render(
    <Suspense fallback="loading">
      <PhotoViewSlide />
    </Suspense>,
    options
  );
  const imageListElement = document.querySelector('.grid') as HTMLDivElement;
  expect(imageListElement.childElementCount).toBe(2);
});

test('hides while loading photo list', () => {
  const options = {
    initialState: {
      breeds: {
        isLoading: true,
        breedList: [],
        breedPhotoList: [],
        selectedBreed: 'breed1'
      } as BreedState
    }
  };
  render(
    <Suspense fallback="loading">
      <PhotoViewSlide />
    </Suspense>,
    options
  );
  const slideElement = document.querySelector('.PhotoSlide') as HTMLDivElement;
  expect(slideElement.childElementCount).toBe(0);
  expect(slideElement.clientHeight).toBe(0);
  expect(slideElement.clientWidth).toBe(0);
});