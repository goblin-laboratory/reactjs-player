import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import usePlaybackRate from '../lib/use-playback-rate';

describe('usePlaybackRate:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() => usePlaybackRate({ live: true, onRateChange: () => {} }, () => {}));

    expect(result.current.playbackRate).toBe(1);

    expect(typeof result.current.changePlaybackRate).toBe('function');

    expect(typeof result.current.onRateChange).toBe('function');
  });

  it('changePlaybackRate', () => {
    let videoEl = null;
    const { result } = renderHook(() => usePlaybackRate({ live: false, onRateChange: () => {} }, () => videoEl));
    // eslint-disable-next-line jsx-a11y/media-has-caption
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
