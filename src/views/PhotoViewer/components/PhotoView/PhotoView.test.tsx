import React, { Suspense } from 'react';
import { render } from 'test-utils';
import PhotoView from './PhotoView';

test('renders image', () => {
  render(
    <PhotoView imageUrl="img1.jpg"/>
  );
  const imageElement = document.querySelector('img') as HTMLImageElement;
  expect(imageElement.src).toContain('img1.jpg');
});