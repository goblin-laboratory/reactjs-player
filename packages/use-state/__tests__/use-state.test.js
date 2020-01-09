import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useState from '../lib/use-state';

describe('useState:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() => useState({ src: '' }, () => {}, () => {}));

    expect(result.current.loading).toBe(false);
    expect(result.current.prevented).toBe(false);
    expect(result.current.paused).toBe(false);
    expect(result.current.ended).toBe(false);
    expect(result.current.seeking).toBe(false);
    expect(result.current.waiting).toBe(false);

    expect(typeof result.current.onPauseClick).toBe('function');
    expect(typeof result.current.onPlayClick).toBe('function');

    expect(typeof result.current.onCanPlay).toBe('function');
    expect(typeof result.current.onPause).toBe('function');
    expect(typeof result.current.onPlay).toBe('function');
    expect(typeof result.current.onPlaying).toBe('function');
    expect(typeof result.current.onEnded).toBe('function');
    expect(typeof result.current.onSeeked).toBe('function');
    expect(typeof result.current.onSeeking).toBe('function');
    expect(typeof result.current.onCanPlayThrough).toBe('function');
    expect(typeof result.current.onWaiting).toBe('function');
  });

  it('状态切换', () => {
    const { result } = renderHook(() =>
      useState(
        {
          src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
          onCanPlay: () => {},
          onPause: () => {},
          onPlay: () => {},
          onPlaying: () => {},
          onEnded: () => {},
          onSeeked: () => {},
          onSeeking: () => {},
          onCanPlayThrough: () => {},
          onWaiting: () => {},
        },
        () => document.querySelector('video'),
      ),
    );

    render(
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        onCanPlay={result.current.onCanPlay}
        onPause={result.current.onPause}
        onPlay={result.current.onPlay}
        onPlaying={result.current.onPlaying}
        onEnded={result.current.onEnded}
        onSeeked={result.current.onSeeked}
        onSeeking={result.current.onSeeking}
        onCanPlayThrough={result.current.onCanPlayThrough}
        onWaiting={result.current.onWaiting}
      />,
    );
    const videoEl = document.querySelector('video');
    expect(!!videoEl).toBe(true);
    videoEl.play = () => {
      videoEl.dispatchEvent(new Event('play'));
      videoEl.dispatchEvent(new Event('waiting'));
      return new Promise(resolve => {
        resolve();
      });
    };

    videoEl.pause = () => {
      videoEl.dispatchEvent(new Event('pause'));
    };

    expect(result.current.loading).toBe(true);
    expect(result.current.paused).toBe(false);
    expect(result.current.ended).toBe(false);
    expect(result.current.seeking).toBe(false);
    expect(result.current.waiting).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.waiting).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('canplaythrough'));
    });
    expect(result.current.waiting).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('playing'));
    });
    expect(result.current.paused).toBe(false);

    act(() => {
      result.current.onPauseClick();
    });
    expect(result.current.paused).toBe(true);

    act(() => {
      result.current.onPlayClick();
    });
    expect(result.current.paused).toBe(false);
    expect(result.current.waiting).toBe(true);

    act(() => {
      videoEl.dispatchEvent(new Event('playing'));
    });
    expect(result.current.paused).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('seeking'));
    });
    expect(result.current.seeking).toBe(true);

    act(() => {
      videoEl.dispatchEvent(new Event('seeked'));
    });
    expect(result.current.seeking).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('ended'));
    });
    expect(result.current.ended).toBe(true);

    act(() => {
      result.current.onPlayClick();
    });
    expect(result.current.ended).toBe(false);
  });

  it('unmounted', () => {
    const { result } = renderHook(() =>
      useState(
        {
          src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
          onCanPlay: () => {},
          onPause: () => {},
          onPlay: () => {},
          onPlaying: () => {},
          onEnded: () => {},
          onSeeked: () => {},
          onSeeking: () => {},
          onCanPlayThrough: () => {},
          onWaiting: () => {},
        },
        () => {},
      ),
    );

    act(() => {
      result.current.onPauseClick();
    });
    expect(result.current.paused).toBe(true);

    act(() => {
      result.current.onPlayClick();
    });
    expect(result.current.paused).toBe(false);
  });
});
