import { useMemoizedFn } from 'ahooks';
import type { Signal } from '@preact/signals';

function usePlayController({
  videoRef,
  signal,
  dispatch,
}: { videoRef: React.RefObject<HTMLVideoElement>; signal: Signal<VideoSignal>; dispatch: dispatchFn }) {
  const play = useMemoizedFn(() => {
    if (!videoRef.current) {
      return;
    }
    const { ended, muted } = signal.peek();
    videoRef.current.muted = true;
    if (ended) {
      videoRef.current.currentTime = 0;
    }
    promisifyPlay(videoRef.current).then(() => {
      if (muted && videoRef.current) {
        videoRef.current.muted = false;
      }
    });
    dispatch({ paused: false }, true);
  });

  const pause = useMemoizedFn(() => {
    videoRef.current?.pause();
    dispatch({ paused: true }, true);
  });

  return { play, pause };
}

export default usePlayController;

function promisifyPlay(video: HTMLVideoElement) {
  const result = video.play();
  if (result instanceof Promise) {
    return result;
  }
  return Promise.resolve();
}
