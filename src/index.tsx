import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import Loading from 'common/Loading/Loading';
import App from 'app/App';

import './index.scss';
import 'i18n/i18n';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
