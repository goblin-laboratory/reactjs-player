import { useMemoizedFn, useMount, useUnmount } from 'ahooks';

function useVolume({ videoRef, dispatch }: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  const onVolumeChange = useMemoizedFn((e) => {
    const payload = { volume: e.target.volume, videoMuted: e.target.muted };
    dispatch(payload);
  });

  useMount(() => {
    videoRef.current?.addEventListener('volumechange', onVolumeChange);
  });

  useUnmount(() => {
    videoRef.current?.removeEventListener('volumechange', onVolumeChange);
  });
}

export default useVolume;
