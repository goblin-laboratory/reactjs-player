import React from 'react';
import { render } from '@testing-library/react';
import ReactjsPlayer from '../src/ReactPlayer';

jest.setTimeout(1000);

test('ReactPlayer: render without crashing', () => {
  render(
    <ReactjsPlayer
      kernel="hlsjs"
      live={false}
      src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
      type="application/x-mpegURL"
    />,
  );
});
