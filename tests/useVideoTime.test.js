import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useVideoTime from '../src/hooks/useVideoTime';

describe('useVideoTime:', () => {
  it('类型与默认值检查：回放', () => {
    const { result } = renderHook(() => useVideoTime({ src: '', live: false }, () => {}));

    expect(result.current.duration).toBe(0);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.buffered).toBe(null);

    expect(typeof result.current.changeCurrentTime).toBe('function');

    expect(typeof result.current.onDurationChange).toBe('function');
    expect(typeof result.current.onTimeUpdate).toBe('function');
    expect(typeof result.current.onProgress).toBe('function');
  });

  it('类型与默认值检查：直播', () => {
    const { result } = renderHook(() => useVideoTime({ src: '', live: true }, () => {}));

    expect(result.current.duration).toBe(-1);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.buffered).toBe(null);

    expect(typeof result.current.changeCurrentTime).toBe('function');

    expect(typeof result.current.onDurationChange).toBe('function');
    expect(typeof result.current.onTimeUpdate).toBe('function');
    expect(typeof result.current.onProgress).toBe('function');
  });

  it('时间：回放', () => {
    let videoEl = null;
    const { result } = renderHook(() =>
      useVideoTime(
        {
          src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
          live: false,
          onDurationChange: () => {},
          onTimeUpdate: () => {},
          onProgress: () => {},
        },
        () => videoEl,
      ),
    );

    render(
      <video
        onDurationChange={result.current.onDurationChange}
        onTimeUpdate={result.current.onTimeUpdate}
        onProgress={result.current.onProgress}
      />,
    );
    videoEl = document.querySelector('video');

    // TypeError: Cannot set property duration of [object HTMLMediaElement] which has only a getter
    // const duration = 10 * 60 * 1000;
    act(() => {
      // videoEl.duration = duration;
      const e = new Event('durationchange', { target: videoEl });
      videoEl.dispatchEvent(e);
    });
    // expect(result.current.duration).toBe(duration);
    expect(result.current.duration).toBe(0);

    // TypeError: Cannot set property buffered of [object HTMLMediaElement] which has only a getter
    // const buffered = { length: 1, start: () => 0, end: () => 10 * 1000 };
    act(() => {
      // videoEl.buffered = buffered;
      const e = new Event('progress', { target: videoEl });
      videoEl.dispatchEvent(e);
    });
    expect(result.current.buffered.length).toBe(0);
    expect(typeof result.current.buffered.start).toBe('function');
    expect(typeof result.current.buffered.end).toBe('function');

    let currentTime = 5 * 1000;
    act(() => {
      videoEl.currentTime = currentTime;
      const e = new Event('timeupdate', { target: videoEl });
      videoEl.dispatchEvent(e);
    });
    expect(result.current.currentTime).toBe(currentTime);

    currentTime = 10 * 1000;
    act(() => {
      result.current.changeCurrentTime(currentTime);
    });
    expect(videoEl.currentTime).toBe(currentTime);
    expect(result.current.currentTime).toBe(currentTime);
  });
});
