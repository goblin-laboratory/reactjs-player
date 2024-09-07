import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { getValidNumber } from './useTime';

function usePlaybackRate({
  videoRef,
  dispatch,
}: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  const onRateChange = useMemoizedFn((e) => dispatch({ playbackRate: getValidNumber(e.target.playbackRate) || 1 }));

  useMount(() => {
    videoRef.current?.addEventListener('ratechange', onRateChange);
  });

  useUnmount(() => {
    videoRef.current?.removeEventListener('ratechange', onRateChange);
  });
}

export default usePlaybackRate;
