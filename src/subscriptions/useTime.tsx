import { useMemoizedFn, useMount, useUnmount } from 'ahooks';

function useTime({ videoRef, dispatch }: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  const onDurationChange = useMemoizedFn((e) => dispatch({ duration: getValidNumber(e.target.duration) }));
  const onTimeUpdate = useMemoizedFn((e) => dispatch({ currentTime: getValidNumber(e.target.currentTime) }));
  const onProgress = useMemoizedFn((e) => dispatch({ buffered: e.target.buffered }));

  const onSeeking = useMemoizedFn(() => dispatch({ seeking: true }));
  const onSeeked = useMemoizedFn(() => dispatch({ seeking: false }));

  useMount(() => {
    videoRef.current?.addEventListener('durationchange', onDurationChange);
    videoRef.current?.addEventListener('timeupdate', onTimeUpdate);
    videoRef.current?.addEventListener('progress', onProgress);
    videoRef.current?.addEventListener('seeking', onSeeking);
    videoRef.current?.addEventListener('seeked', onSeeked);
  });

  useUnmount(() => {
    videoRef.current?.removeEventListener('durationchange', onDurationChange);
    videoRef.current?.removeEventListener('timeupdate', onTimeUpdate);
    videoRef.current?.removeEventListener('progress', onProgress);
    videoRef.current?.removeEventListener('seeking', onSeeking);
    videoRef.current?.removeEventListener('seeked', onProgress);
  });
}

export default useTime;

/** 获取合法的数字 */
export function getValidNumber(v?: unknown) {
  const value = Number(v);
  return Number.isNaN(value) || Number.isFinite(value) ? 0 : value;
}
