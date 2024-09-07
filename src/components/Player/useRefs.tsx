import React from 'react';
// import { useMemoizedFn } from 'ahooks';

function useRefs(props: {
  videoRef?: React.RefObject<HTMLVideoElement>;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<HTMLDivElement>(null);
  const ref = props?.videoRef || videoRef;

  return { videoRef: ref, playerRef };
}

export default useRefs;
