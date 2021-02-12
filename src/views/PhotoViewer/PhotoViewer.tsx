import React from 'react';
import BreedSelector from './components/BreedSelector/BreedSelector';
import PhotoSlide from './components/PhotoSlide/PhotoSlide';
import './PhotoViewer.scss';

export default function PhotoViewer() {
  return (
    <>
      <BreedSelector />
      <PhotoSlide />
    </>
  );
};