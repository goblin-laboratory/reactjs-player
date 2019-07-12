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

// describe('ReactPlayer: native', () => {
//   it('render without crashing', () => {
//     render(<ReactPlayer kernel="native" live={false} src="http://cdn.toxicjohann.com/lostStar.mp4" type="video/mp4" />);
//   });
// });

// describe('ReactPlayer: flvjs', () => {
//   it('render without crashing', () => {
//     window.MediaSource = function() {};
//     render(
//       <ReactPlayer kernel="flvjs" live={false} src="http://cdn.toxicjohann.com/lostStar.mp4" type="video/x-flv" />,
//     );
//   });
// });
