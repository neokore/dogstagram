import React from 'react';
import BreedSelector from './components/BreedSelector/BreedSelector';
import PhotoSlide from './components/PhotoViewSlide/PhotoViewSlide';

import './PhotoViewer.scss';

export default function PhotoViewer() {
  

  return (
    <div className="PhotoViewer">
      <BreedSelector />
      <PhotoSlide />
    </div>
  );
};