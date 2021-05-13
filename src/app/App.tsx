import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import PhotoViewer from 'views/PhotoViewer/PhotoViewer';
import UserMessageUI from 'common/UserMessageUI/UserMessageUI';
import { rootMachine, RootMachineInterpreter } from 'machine/rootMachine';
import './App.scss';

export const RootMachineProvider = createContext({} as RootMachineInterpreter);

function App() {
  const [, , service] = useMachine(rootMachine);

  return (
    <RootMachineProvider.Provider value={service}>
      <div className="App">
        <header className="header">🐶 Dogstagram! 🐾</header>
        <PhotoViewer />
        <UserMessageUI />
      </div>
    </RootMachineProvider.Provider>
  );
}

export default App;
