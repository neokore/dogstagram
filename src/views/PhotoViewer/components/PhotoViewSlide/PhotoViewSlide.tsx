import React, { useContext } from 'react';
import { useActor } from '@xstate/react';
import { BreedProvider } from 'views/PhotoViewer/PhotoViewer';
import PhotoView from '../PhotoView/PhotoView';
import './PhotoViewSlide.scss';

export default function PhotoSlide() {
  const breedActor = useContext(BreedProvider);
  const [current] = useActor(breedActor);
  const { breedPhotoList } = current.context;

  return (
    <div className="PhotoSlide">
      {
        breedPhotoList?.length > 0 && (
          <div className="grid">
            { breedPhotoList.map((photoUrl: string, index: number) =>
              <PhotoView key={`photo_${index}`} imageUrl={photoUrl} />
            )}
          </div>
        )
      }
    </div>
  );
}