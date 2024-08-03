declare type LoadParams<K> = { videoRef: React.RefObject<HTMLVideoElement>; src: string; config: K };

declare type PlayerKernel = { name: string };

declare type ReactjsPlayerSignals = {
  loading: boolean;
  prevented: boolean;
  paused: boolean;
  ended: boolean;
  seeking: boolean;
  waiting: boolean;
  duration: number;
  currentTime: number;
  buffered: null;
  muted: boolean;
  volume: number;
  playbackRate: number;
  pip: boolean;
  fullscreen: boolean;
  error?: Error|null;
};
