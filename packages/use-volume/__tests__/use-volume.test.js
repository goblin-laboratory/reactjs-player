// import React from 'react';
import {
  renderHook,
  // act,
} from '@testing-library/react-hooks';
// import { render } from '@testing-library/react';

import useVolume from '../lib/use-volume';

describe('useVolume:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() => useVolume(() => {}));

    expect(result.current.muted).toBe(false);
    expect(result.current.volume).toBe(1);

    expect(typeof result.current.onMutedClick).toBe('function');
    expect(typeof result.current.changeVolume).toBe('function');
  });

  // it('onMutedClick/changeVolume', () => {
  //   let videoEl = null;
  //   const { result } = renderHook(() => useVolume(() => videoEl, false));

  //   // eslint-disable-next-line jsx-a11y/media-has-caption
  //   render(<video />);
  //   videoEl = document.querySelector('video');

  //   expect(result.current.volume).toBe(1);
  //   expect(result.current.muted).toBe(false);
  //   expect(videoEl.muted).toBe(false);

  //   act(() => {
  //     result.current.onMutedClick();
  //   });
  //   expect(videoEl.muted).toBe(true);

  //   expect(result.current.volume).toBe(1);
  //   expect(result.current.muted).toBe(true);

  //   act(() => {
  //     result.current.onMutedClick();
  //   });
  //   expect(result.current.volume).toBe(1);
  //   expect(result.current.muted).toBe(false);

  //   act(() => {
  //     result.current.changeVolume(0.8);
  //   });
  //   expect(result.current.volume).toBe(0.8);
  //   expect(result.current.muted).toBe(false);

  //   act(() => {
  //     result.current.changeVolume(0);
  //   });
  //   expect(result.current.volume).toBe(0);
  //   expect(result.current.muted).toBe(true);

  //   act(() => {
  //     result.current.changeVolume(0.8);
  //   });
  //   expect(result.current.volume).toBe(0.8);
  //   expect(result.current.muted).toBe(false);

  //   act(() => {
  //     result.current.changeVolume(0);
  //   });
  //   expect(result.current.volume).toBe(0);
  //   expect(result.current.muted).toBe(true);

  //   act(() => {
  //     result.current.onMutedClick();
  //   });
  //   expect(result.current.volume).toBe(1);
  //   expect(result.current.muted).toBe(false);
  // });
});
