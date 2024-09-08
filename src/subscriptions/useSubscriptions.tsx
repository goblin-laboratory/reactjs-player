import useAutoPlay from './useAutoPlay';
import usePlayState from './usePlayState';
import useFullscreen from './useFullscreen';
import usePictureInPicture from './usePictureInPicture';
import useTime from './useTime';
import usePlaybackRate from './usePlaybackRate';
import useVolume from './useVolume';
import type { Signal } from '@preact/signals';

function useSubscriptions({
  videoRef,
  signal,
  dispatch,
}: { videoRef: React.RefObject<HTMLVideoElement>; signal: Signal<VideoSignal>; dispatch: dispatchFn }) {
  useAutoPlay({ videoRef, signal, dispatch });
  usePlayState({ videoRef, dispatch });
  useTime({ videoRef, dispatch });
  useVolume({ videoRef, dispatch });
  usePlaybackRate({ videoRef, dispatch });

  useFullscreen({ videoRef, dispatch });
  usePictureInPicture({ videoRef, dispatch });
}

export default useSubscriptions;
