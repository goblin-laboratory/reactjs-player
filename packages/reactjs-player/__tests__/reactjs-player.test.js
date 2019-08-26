import React from 'react';
import { render } from '@testing-library/react';
import ReactPlayer from '../src/components/ReactPlayer';

jest.setTimeout(1000);

describe('ReactPlayer: hlsjs', () => {
  it('render without crashing', () => {
    render(
      <ReactPlayer
        kernel="hlsjs"
        live={false}
        src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
        type="application/x-mpegURL"
      />,
    );
  });
});
