import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useVideoPlaybackRate from '../src/hooks/useVideoPlaybackRate';

describe('useVideoPlaybackRate:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() => useVideoPlaybackRate({ live: true, onRateChange: () => {} }, () => {}));

    expect(result.current.playbackRate).toBe(1);

    expect(typeof result.current.changePlaybackRate).toBe('function');

    expect(typeof result.current.onRateChange).toBe('function');
  });

  it('changePlaybackRate', () => {
    let videoEl = null;
    const { result } = renderHook(() => useVideoPlaybackRate({ live: false, onRateChange: () => {} }, () => videoEl));
    render(<video onRateChange={result.current.onRateChange} />);
    videoEl = document.querySelector('video');

    expect(result.current.playbackRate).toBe(1);

    act(() => {
      result.current.changePlaybackRate(0.5);
    });

    expect(result.current.playbackRate).toBe(0.5);

    act(() => {
      videoEl.playbackRate = 1;
    });
    expect(result.current.playbackRate).toBe(1);
  });
});
