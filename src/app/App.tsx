import React, { Suspense } from 'react';
import PhotoViewer from 'views/PhotoViewer/PhotoViewer';
import UserMessageUI from 'components/UserMessageUI/UserMessageUI';
import Loading from 'components/Loading/Loading';
import './App.scss';
import 'i18n/i18n';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="App">
        <header className="header">
        🐶 Dogstagram! 🐾
        </header>
        <PhotoViewer />
        <UserMessageUI />
      </div>
    </Suspense>
  );
}

export default App;
