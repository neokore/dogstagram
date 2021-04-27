import React, { useContext, useState } from 'react';
import { useService } from '@xstate/react';
import { useTranslation } from 'react-i18next';
import { UserMessageProvider } from 'app/App';
import { UserMessageEvent, UserMessageSeverity } from 'machine/userMessageMachine';
import './PhotoView.scss';

export default function PhotoView(props: { imageUrl: string }) {
  let { imageUrl } = props;
  const service = useContext(UserMessageProvider);
  const [, sendUserMessage] = useService(service);
  const [isSelected, setSelected] = useState(false);
  const [hasLoaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    if (hasLoaded) {
      setSelected(!isSelected);
      !isSelected && sendUserMessage(UserMessageEvent.SHOW, { severity: UserMessageSeverity.INFO, message: t('PhotoView.tapToClose') });
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
      alt=""
    />
  );
};