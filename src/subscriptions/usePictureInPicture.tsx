import { useMemoizedFn, useMount, useUnmount } from 'ahooks';

function usePictureInPicture({
  videoRef,
  dispatch,
}: { videoRef: React.RefObject<HTMLVideoElement>; dispatch: dispatchFn }) {
  const onEnterPictureInPicture = useMemoizedFn(() => dispatch({ pip: true }));
  const onLeavePictureInPicture = useMemoizedFn(() => dispatch({ pip: false }));

  useMount(() => {
    videoRef.current?.addEventListener('enterpictureinpicture', onEnterPictureInPicture);
    videoRef.current?.addEventListener('leavepictureinpicture', onLeavePictureInPicture);
  });

  useUnmount(() => {
    videoRef.current?.removeEventListener('enterpictureinpicture', onEnterPictureInPicture);
    videoRef.current?.removeEventListener('leavepictureinpicture', onLeavePictureInPicture);
  });
}

export default usePictureInPicture;
