import { renderHook } from '@testing-library/react-hooks';
import useVideoFullscreen from '../src/hooks/useVideoFullscreen';

describe('useVideoFullscreen:', () => {
  it('类型与默认值检查', () => {
    const { result } = renderHook(() =>
      useVideoFullscreen({ x5playsinline: false, onX5VideoFullscreenChange: () => {} }, () => {}, () => {}),
    );

    expect(result.current.fullscreen).toBe(false);
    expect(result.current.x5videofullscreen).toBe(false);
    expect(typeof result.current.requestFullscreen).toBe('function');
    expect(typeof result.current.exitFullscreen).toBe('function');
  });
});
