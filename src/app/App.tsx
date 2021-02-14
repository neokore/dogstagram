import React, { Suspense } from 'react';
import PhotoViewer from 'views/PhotoViewer/PhotoViewer';
import UserMessageUI from 'common/UserMessageUI/UserMessageUI';
import Loading from 'common/Loading/Loading';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="header">🐶 Dogstagram! 🐾</header>
      <PhotoViewer />
      <UserMessageUI />
    </div>
  );
}

export default App;
