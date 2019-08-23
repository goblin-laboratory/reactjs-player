import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useFullscreen from '../lib/use-fullscreen';

describe('useFullscreen:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() =>
      useFullscreen({ x5playsinline: false, onFullscreenChange: () => {} }, () => {}, () => {}),
    );

    expect(result.current.fullscreen).toBe(false);
    expect(result.current.x5videofullscreen).toBe(false);
    expect(typeof result.current.requestFullscreen).toBe('function');
    expect(typeof result.current.exitFullscreen).toBe('function');
  });

  it('requestFullscreen/exitFullscreen', () => {
    // eslint-disable-next-line jsx-a11y/media-has-caption
    render(<video />);
    const videoEl = document.querySelector('video');
    expect(!!videoEl).toBe(true);
    videoEl.requestFullscreen = () => {
      document.fullscreenElement = videoEl;
      document.dispatchEvent(new Event('fullscreenchange'));
    };
    document.exitFullscreen = () => {
      document.fullscreenElement = null;
      document.dispatchEvent(new Event('fullscreenchange'));
    };
    expect(!!videoEl.requestFullscreen).toBe(true);
    expect(!!document.exitFullscreen).toBe(true);

    const { result } = renderHook(() =>
      useFullscreen({ x5playsinline: false, onFullscreenChange: () => {} }, () => videoEl, () => videoEl),
    );

    act(() => {
      result.current.requestFullscreen();
    });
    expect(result.current.fullscreen).toBe(true);

    act(() => {
      result.current.exitFullscreen();
    });
    expect(result.current.fullscreen).toBe(false);
  });

  it('x5playsinline', () => {
    // eslint-disable-next-line jsx-a11y/media-has-caption
    render(<video />);
    const videoEl = document.querySelector('video');
    expect(!!videoEl).toBe(true);
    expect(!!videoEl.requestFullscreen).toBe(false);
    delete document.exitFullscreen;
    expect(!!document.exitFullscreen).toBe(false);

    const { result } = renderHook(() =>
      useFullscreen({ x5playsinline: true, onFullscreenChange: () => {} }, () => videoEl, () => videoEl),
    );

    act(() => {
      videoEl.dispatchEvent(new Event('x5videoenterfullscreen'));
    });
    expect(result.current.x5videofullscreen).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(videoEl.style.width).toBe(`${window.innerWidth}px`);
    expect(videoEl.style.height).toBe(`${window.innerHeight}px`);

    act(() => {
      result.current.requestFullscreen();
    });
    expect(result.current.fullscreen).toBe(true);

    act(() => {
      result.current.exitFullscreen();
    });
    expect(result.current.fullscreen).toBe(false);

    act(() => {
      videoEl.dispatchEvent(new Event('x5videoexitfullscreen'));
    });
    expect(result.current.x5videofullscreen).toBe(false);
  });

  it('unmounted', () => {
    const { result } = renderHook(() =>
      useFullscreen({ x5playsinline: false, onFullscreenChange: () => {} }, () => {}, () => {}),
    );

    act(() => {
      result.current.requestFullscreen();
    });
    expect(result.current.fullscreen).toBe(false);

    act(() => {
      result.current.exitFullscreen();
    });
    expect(result.current.fullscreen).toBe(false);
  });

  it('unmounted with x5playsinline', () => {
    const { result } = renderHook(() =>
      useFullscreen({ x5playsinline: true, onFullscreenChange: () => {} }, () => {}, () => {}),
    );

    act(() => {
      result.current.requestFullscreen();
    });
    expect(result.current.fullscreen).toBe(false);

    act(() => {
      result.current.exitFullscreen();
    });
    expect(result.current.fullscreen).toBe(false);
  });
});
