import React from 'react';
import { render, screen } from 'test-utils';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Dogstagram/i);
  expect(titleElement).toBeInTheDocument();
});
