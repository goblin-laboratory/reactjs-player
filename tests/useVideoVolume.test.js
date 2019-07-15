import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import useVideoVolume from '../src/hooks/useVideoVolume';

describe('useVideoVolume:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() => useVideoVolume({ src: '', live: false, volume: 1, muted: false }, () => {}));

    expect(result.current.muted).toBe(false);
    expect(result.current.volume).toBe(1);

    expect(typeof result.current.onMutedClick).toBe('function');
    expect(typeof result.current.changeVolume).toBe('function');

    expect(typeof result.current.onVolumeChange).toBe('function');
  });

  it('onVolumeChange', () => {
    let videoEl = null;
    const { result } = renderHook(() =>
      useVideoVolume({ muted: false, volume: 1, onVolumeChange: () => {} }, () => videoEl),
    );

    render(<video onVolumeChange={result.current.onVolumeChange} />);
    videoEl = document.querySelector('video');

    expect(result.current.muted).toBe(false);
    expect(result.current.volume).toBe(1);

    act(() => {
      videoEl.volume = 0.8;
    });
    expect(result.current.volume).toBe(0.8);
    expect(result.current.muted).toBe(false);

    act(() => {
      videoEl.volume = 0;
    });
    expect(result.current.volume).toBe(0);
    expect(result.current.muted).toBe(true);
  });

  it('onMutedClick/changeVolume', () => {
    let videoEl = null;
    const { result } = renderHook(() =>
      useVideoVolume({ muted: false, volume: 1, onVolumeChange: () => {} }, () => videoEl),
    );

    render(<video onVolumeChange={result.current.onVolumeChange} />);
    videoEl = document.querySelector('video');

    expect(result.current.volume).toBe(1);
    expect(result.current.muted).toBe(false);

    act(() => {
      result.current.onMutedClick();
    });
    expect(result.current.volume).toBe(1);
    expect(result.current.muted).toBe(true);

    act(() => {
      result.current.onMutedClick();
    });
    expect(result.current.volume).toBe(1);
    expect(result.current.muted).toBe(false);

    act(() => {
      result.current.changeVolume(0.8);
    });
    expect(result.current.volume).toBe(0.8);
    expect(result.current.muted).toBe(false);

    act(() => {
      result.current.changeVolume(0);
    });
    expect(result.current.volume).toBe(0);
    expect(result.current.muted).toBe(true);

    act(() => {
      result.current.changeVolume(0.8);
    });
    expect(result.current.volume).toBe(0.8);
    expect(result.current.muted).toBe(false);

    act(() => {
      result.current.changeVolume(0);
    });
    expect(result.current.volume).toBe(0);
    expect(result.current.muted).toBe(true);

    act(() => {
      result.current.onMutedClick();
    });
    expect(result.current.volume).toBe(1);
    expect(result.current.muted).toBe(false);
  });
});
