import React, { createContext } from 'react';
import { Interpreter } from 'xstate';
import { useMachine } from '@xstate/react';
import PhotoViewer from 'views/PhotoViewer/PhotoViewer';
import UserMessageUI from 'common/UserMessageUI/UserMessageUI';
import { UserMessageContext, UserMessageEventType, userMessageMachine, UserMessageMachineSchema } from 'machine/userMessageMachine';
import './App.scss';

export const UserMessageProvider = createContext({} as Interpreter<UserMessageContext, UserMessageMachineSchema, UserMessageEventType, any>);

function App() {
  const [, , service] = useMachine(userMessageMachine);

  return (
    <UserMessageProvider.Provider value={service}>
      <div className="App">
        <header className="header">🐶 Dogstagram! 🐾</header>
        <PhotoViewer />
        <UserMessageUI />
      </div>
    </UserMessageProvider.Provider>
  );
}

export default App;
