import React, { createContext, useContext } from 'react';
import { useService } from "@xstate/react";
import { BreedMachineRefType } from 'machine/breedMachine';
import { RootMachineProvider } from 'app/App';
import BreedSelector from './components/BreedSelector/BreedSelector';
import PhotoSlide from './components/PhotoViewSlide/PhotoViewSlide';
import './PhotoViewer.scss';

export const BreedProvider = createContext({} as BreedMachineRefType);

export default function PhotoViewer() {
  const service = useContext(RootMachineProvider);
  const [current] = useService(service);

  return (
    <BreedProvider.Provider value={current.context.breedsRef}>
      <div className="PhotoViewer">
        <BreedSelector />
        <PhotoSlide />
      </div>
    </BreedProvider.Provider>
  );
};