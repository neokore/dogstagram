import React from 'react';
import './Loading.scss';
import LoadingImg from 'assets/img/loading.png';

export default function Loading() {
  return (
    <div className="Loading">
      <img src={LoadingImg} />
      Loading...
    </div>
  );
};
