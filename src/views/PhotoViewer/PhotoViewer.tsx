import React, { createContext } from 'react';
import { Interpreter } from 'xstate';
import { useMachine } from "@xstate/react";
import { BreedContext, BreedEvent, breedMachine, BreedStateSchema } from 'machine/breedMachine';
import BreedSelector from './components/BreedSelector/BreedSelector';
import PhotoSlide from './components/PhotoViewSlide/PhotoViewSlide';
import './PhotoViewer.scss';

export const BreedProvider = createContext({} as Interpreter<BreedContext, BreedStateSchema, BreedEvent, any>);

export default function PhotoViewer() {
  const [, , service] = useMachine(breedMachine);

  return (
    <BreedProvider.Provider value={service}>
      <div className="PhotoViewer">
        <BreedSelector />
        <PhotoSlide />
      </div>
    </BreedProvider.Provider>
  );
};