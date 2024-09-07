import { useMemoizedFn, useMount, useUnmount } from 'ahooks';

function useFullscreen({ videoRef, dispatch }: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  const onChange = useMemoizedFn(() => dispatch({ fullscreen: document.fullscreenElement === videoRef.current }));

  useMount(() => {
    document.addEventListener('fullscreenchange', onChange);
  });

  useUnmount(() => {
    document.removeEventListener('fullscreenchange', onChange);
  });
}

export default useFullscreen;
