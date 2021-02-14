import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserMessage, UserMessageType, setUserMessage } from 'state/slices/userMessageSlice';
import './PhotoView.scss';

export default function PhotoView(props: { imageUrl: string }) {
  let { imageUrl } = props;
  const [isSelected, setSelected] = useState(false);
  const [hasLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    if (hasLoaded) {
      setSelected(!isSelected);
      !isSelected && dispatch(setUserMessage({type: UserMessageType.info, message: t('PhotoView.tapToClose')} as UserMessage));
    }
  };
  const handleLoad = () => setLoaded(true);

  return (
    <img
      className={`PhotoView ${isSelected ? 'selected' : ''} ${hasLoaded ? 'loaded' : ''}`}
      src={imageUrl}
      loading="lazy"
      onLoad={handleLoad}
      onClick={handleClick}
    />
  );
};