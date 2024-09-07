import { useRef } from 'react';
import { useSignal, useSignalEffect } from '@preact/signals';
import { useMemoizedFn, useDeepCompareLayoutEffect, useDebounceFn } from 'ahooks';

function useVideoSignal(src?: string) {
  const signal = useSignal<VideoSignal>(getDefaultSignal());
  const ref = useRef<Partial<VideoSignal> | null>(null);

  const { run, flush } = useDebounceFn(
    () => {
      signal.value = { ...signal.peek(), ...ref.current };
      ref.current = null;
    },
    { wait: 500, maxWait: 1000 },
  );

  const dispatch: dispatchFn = useMemoizedFn((values: Partial<VideoSignal>, f = false) => {
    ref.current = { ...ref.current, ...values };
    run();
    if (f) {
      flush();
    }
  });

  useDeepCompareLayoutEffect(() => {
    dispatch(getDefaultSignal(src), true);
  }, [src]);

  useSignalEffect(() => {
    console.log(signal.value);
  });

  return { signal, dispatch };
}

export default useVideoSignal;

function getDefaultSignal(src?: string) {
  return {
    paused: false,
    ended: false,
    seeking: false,
    waiting: false,
    duration: 0,
    currentTime: 0,
    buffered: null,
    muted: false,
    volume: 1,
    playbackRate: 1,
    pip: false,
    fullscreen: false,
    error: null,
    loading: !!src,
    videoMuted: false,
  };
}
