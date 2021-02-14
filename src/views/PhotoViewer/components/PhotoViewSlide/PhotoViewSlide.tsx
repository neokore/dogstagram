import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'state/rootReducer';
import PhotoView from '../PhotoView/PhotoView';
import './PhotoViewSlide.scss';

export default function PhotoSlide() {
  const {
    breedPhotoList
  } = useSelector((state: RootState) => state.breeds);

  return (
    <div className="PhotoSlide">
      {
        breedPhotoList.length > 0 && (
          <div className="grid">
            { breedPhotoList.map((photoUrl: string, index: number) =>
              <PhotoView key={index} imageUrl={photoUrl} />
            )}
          </div>
        )
      }
    </div>
  );
}