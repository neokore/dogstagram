import React, { useCallback, useContext, useEffect } from 'react';
import { useService } from '@xstate/react';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { UserMessageProvider } from 'app/App';
import { UserMessageEvent, UserMessageSeverity } from 'machine/userMessageMachine';
import './UserMessageUI.scss';

export default function UserMessageUI () {
  const service = useContext(UserMessageProvider);
  const [current, send] = useService(service);
  const { severity, message } = current.context;
  const type = current.value;

  const getMessageIcon = useCallback(
    () => severity === UserMessageSeverity.ERROR
      ? <ErrorIcon className="icon error" />
      : severity === UserMessageSeverity.INFO
        ? <InfoIcon className="icon info" />
        : null,
    [severity]
  );
  const handleClose = () => { send(UserMessageEvent.CLEAR); };

  if (!message) return null;

  return (
    <div className="UserMessage">
      {getMessageIcon()}
      <p>{message}</p>
      { type === UserMessageSeverity.ERROR && <button onClick={handleClose}><CloseIcon className="icon" /></button>}
    </div>
  );
}