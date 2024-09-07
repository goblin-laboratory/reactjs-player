import { useMemoizedFn, useMount, useUnmount } from 'ahooks';

function usePlayState({ videoRef, dispatch }: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  const onCanPlay = useMemoizedFn(() => dispatch({ loading: false, waiting: false }));
  const onPause = useMemoizedFn(() => dispatch({ paused: true }));
  const onPlay = useMemoizedFn(() => dispatch({ paused: false, ended: false }));
  const onEnded = useMemoizedFn(() => dispatch({ ended: true }));
  const onWaiting = useMemoizedFn(() => dispatch({ waiting: true }));
  const onCanPlayThrough = useMemoizedFn(() => dispatch({ waiting: true }));

  useMount(() => {
    videoRef.current?.addEventListener('canplay', onCanPlay);
    videoRef.current?.addEventListener('pause', onPause);
    videoRef.current?.addEventListener('play', onPlay);
    videoRef.current?.addEventListener('playing', onPlay);
    videoRef.current?.addEventListener('ended', onEnded);
    videoRef.current?.addEventListener('waiting', onWaiting);
    videoRef.current?.addEventListener('canplaythrough', onCanPlayThrough);
  });

  useUnmount(() => {
    videoRef.current?.removeEventListener('canplay', onCanPlay);
    videoRef.current?.removeEventListener('pause', onPause);
    videoRef.current?.removeEventListener('play', onPlay);
    videoRef.current?.removeEventListener('playing', onPlay);
    videoRef.current?.removeEventListener('ended', onEnded);
    videoRef.current?.removeEventListener('waiting', onWaiting);
    videoRef.current?.removeEventListener('canplaythrough', onCanPlayThrough);
  });
  return null;
}

export default usePlayState;
