import React, { useContext } from 'react';
import { useService } from '@xstate/react';
import PhotoView from '../PhotoView/PhotoView';
import './PhotoViewSlide.scss';
import { BreedProvider } from 'views/PhotoViewer/PhotoViewer';

export default function PhotoSlide() {
  const service = useContext(BreedProvider);
  const [current] = useService(service);
  const { breedPhotoList } = current.context;

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