import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import usePlayController from '../controllers/usePlayController';
import type { Signal } from '@preact/signals';

function useAutoPlay({
  videoRef,
  signal,
  dispatch,
}: { videoRef: React.RefObject<HTMLVideoElement>; signal: Signal<VideoSignal>; dispatch: dispatchFn }) {
  const { play } = usePlayController({ videoRef, signal, dispatch });
  const onCanPlay = useMemoizedFn(() => {
    // NOTE: 电脑和安卓端自动播放处理，iOS 机制不一样需要在 kernel 中调用 play
    if (signal.peek().loading) {
      play();
    }
  });

  useMount(() => {
    videoRef.current?.addEventListener('canplay', onCanPlay);
  });

  useUnmount(() => {
    videoRef.current?.removeEventListener('canplay', onCanPlay);
  });
  return null;
}

export default useAutoPlay;
