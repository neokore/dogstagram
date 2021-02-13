import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'state/rootReducer';
import { clearUserMessage } from 'state/slices/userMessageSlice';
import './UserMessageUI.scss';

export default function UserMessageUI () {
  const {
    type,
    message
  } = useSelector((state: RootState) => state.userMessage);
  const dispatch = useDispatch();
  
  const handleClose = () => { dispatch(clearUserMessage()); };

  if (!message) return null;

  return (
    <div className="UserMessage">
      {message}
      <button onClick={handleClose}>X</button>
    </div>
  );
}