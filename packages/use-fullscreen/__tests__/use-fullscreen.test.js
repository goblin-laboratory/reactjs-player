import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useFullscreen from '../lib/use-fullscreen';

describe('useFullscreen:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() =>
      useFullscreen(
        { onFullscreenChange: () => {} },
        () => {},
        () => {},
      ),
    );

    expect(result.current.fullscreen).toBe(false);
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
      useFullscreen(
        { onFullscreenChange: () => {} },
        () => videoEl,
        () => videoEl,
      ),
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

  it('unmounted', () => {
    const { result } = renderHook(() =>
      useFullscreen(
        { onFullscreenChange: () => {} },
        () => {},
        () => {},
      ),
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
