import usePlayState from './usePlayState';
import useFullscreen from './useFullscreen';
import usePictureInPicture from './usePictureInPicture';
import useTime from './useTime';
import usePlaybackRate from './usePlaybackRate';
import useVolume from './useVolume';

function useSubscriptions({ videoRef, dispatch }: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  usePlayState({ videoRef, dispatch });
  useTime({ videoRef, dispatch });
  useVolume({ videoRef, dispatch });
  usePlaybackRate({ videoRef, dispatch });

  useFullscreen({ videoRef, dispatch });
  usePictureInPicture({ videoRef, dispatch });
}

export default useSubscriptions;
