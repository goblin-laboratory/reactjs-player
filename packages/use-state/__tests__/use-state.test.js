import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useState from '../lib/use-state';

describe('useState:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() => useState('', () => {}));

    expect(result.current.loading).toBe(false);
    expect(result.current.prevented).toBe(false);
    expect(result.current.paused).toBe(false);
    expect(result.current.ended).toBe(false);
    expect(result.current.seeking).toBe(false);
    expect(result.current.waiting).toBe(false);

    expect(typeof result.current.onPauseClick).toBe('function');
    expect(typeof result.current.onPlayClick).toBe('function');
  });

  it('状态切换', () => {
    const { result } = renderHook(() =>
      useState('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8', () => document.querySelector('video')),
    );

    // eslint-disable-next-line jsx-a11y/media-has-caption
    render(<video />);
    const videoEl = document.querySelector('video');
    expect(!!videoEl).toBe(true);
    videoEl.load = () => {
      videoEl.dispatchEvent(new Event('canplay'));
      videoEl.dispatchEvent(new Event('canplaythrough'));
    };
    videoEl.play = () => {
      videoEl.dispatchEvent(new Event('waiting'));
      videoEl.dispatchEvent(new Event('canplay'));
      videoEl.dispatchEvent(new Event('canplaythrough'));
      videoEl.dispatchEvent(new Event('play'));
      videoEl.dispatchEvent(new Event('playing'));
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
    expect(result.current.loading).toBe(true);
    // expect(result.current.prevented).toBe(true);
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
    expect(result.current.waiting).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('playing'));
    });
    expect(result.current.paused).toBe(false);

    // act(() => {
    //   videoEl.dispatchEvent(new Event('seeking'));
    // });
    // act(() => {
    //   videoEl.dispatchEvent(new Event('waiting'));
    // });
    // expect(result.current.seeking).toBe(false);
    // expect(result.current.waiting).toBe(true);

    // act(() => {
    //   videoEl.dispatchEvent(new Event('seeked'));
    // });
    // expect(result.current.seeking).toBe(false);

    // act(() => {
    //   videoEl.dispatchEvent(new Event('ended'));
    // });
    // expect(result.current.ended).toBe(true);

    // act(() => {
    //   result.current.onPlayClick();
    // });
    // expect(result.current.ended).toBe(false);
  });
});
