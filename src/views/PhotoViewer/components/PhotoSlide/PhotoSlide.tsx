import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'state/rootReducer';
import './PhotoSlide.scss';

export default function PhotoSlide() {
  const {
    breedPhotoList,
    isLoading
  } = useSelector((state: RootState) => state.breeds);

  return (
    <div>
      {
        !isLoading
          ? breedPhotoList.map((photoUrl: string, index: number) =>
              <img key={index} src={photoUrl} />
            )
          : (<p>Loading</p>)
        }
    </div>
  );
}