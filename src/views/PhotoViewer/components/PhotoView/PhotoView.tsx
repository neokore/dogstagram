import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './PhotoView.scss';

export default function PhotoView(props: { imageUrl: string }) {
  const { imageUrl } = props;
  const [isSelected, setSelected] = useState(false);
  const [hasLoaded, setLoaded] = useState(false);

  const handleClick = () => hasLoaded && setSelected(!isSelected);
  const handleLoad = () => setLoaded(true);

  return (
    <img
      className={`PhotoView ${isSelected ? 'selected' : ''} ${hasLoaded ? 'loaded' : ''}`}
      src={imageUrl}
      loading="lazy"
      onLoad={handleLoad}
      onClick={handleClick}
    />
  )
};