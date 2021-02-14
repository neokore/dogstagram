import React from 'react';
import { render, screen } from 'test-utils';
import UserMessageUI from './UserMessageUI';
import { UserMessage, UserMessageType } from 'state/slices/userMessageSlice';

test('hides if no message', () => {
  const options = {
    initialState: {
      userMessage: {
        type: null,
        message: null
      } as UserMessage
    }
  };
  render(
    <UserMessageUI />,
    options
  );
  const messageElement = document.querySelector('.UserMessage') as HTMLDivElement;
  expect(messageElement).toBeNull();
});

test('shows info message style', () => {
  const options = {
    initialState: {
      userMessage: {
        type: UserMessageType.info,
        message: 'Test message'
      } as UserMessage
    }
  };
  render(
    <UserMessageUI />,
    options
  );
  const messageElement = screen.getByText('Test message');
  expect(messageElement).toBeInTheDocument();
  const iconElement = document.querySelector('.icon.info');
  expect(iconElement).toBeInTheDocument();
  const buttonElement = document.querySelector('button');
  expect(buttonElement).toBeNull();
});

test('shows error message style', () => {
  const options = {
    initialState: {
      userMessage: {
        type: UserMessageType.error,
        message: 'Test error'
      } as UserMessage
    }
  };
  render(
    <UserMessageUI />,
    options
  );
  const messageElement = screen.getByText('Test error');
  expect(messageElement).toBeInTheDocument();
  const iconElement = document.querySelector('.icon.error');
  expect(iconElement).toBeInTheDocument();
  const buttonElement = document.querySelector('button');
  expect(buttonElement).toBeInTheDocument();
});