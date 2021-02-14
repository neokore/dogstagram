import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'state/rootReducer';
import { clearUserMessage, UserMessageType } from 'state/slices/userMessageSlice';
import './UserMessageUI.scss';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

export default function UserMessageUI () {
  const {
    type,
    message
  } = useSelector((state: RootState) => state.userMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    // Autoclose info messages
    let timeout: ReturnType<typeof setTimeout>;
    if (type === UserMessageType.info) {
      timeout = setTimeout(() => {
        dispatch(clearUserMessage());
      }, 2000);
    }

    return () => { timeout && clearTimeout(timeout); };
  }, [dispatch, type])
  
  const getMessageIcon = useCallback(
    () => type === UserMessageType.error
      ? <ErrorIcon className="icon error" />
      : type === UserMessageType.info
        ? <InfoIcon className="icon info" />
        : null,
    [type]
  );
  const handleClose = () => { dispatch(clearUserMessage()); };

  if (!message) return null;

  return (
    <div className="UserMessage">
      {getMessageIcon()}
      <p>{message}</p>
      { type === UserMessageType.error && <button onClick={handleClose}><CloseIcon className="icon" /></button>}
    </div>
  );
}