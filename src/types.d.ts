// declare global {
//   interface HTMLDivElement {
//     webkitRequestFullscreen: () => Promise<void>;
//   }

//   interface HTMLVideoElement {
//     webkitEnterFullScreen: () => Promise<void>;
//   }
// }

declare type PlayerProps = {
  kernel?: string;
  src?: string;
  config?: unknown;
  playerProps?: React.HTMLAttributes<HTMLDivElement>;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
  children?: React.ReactNode;
  videoRef?: React.RefObject<HTMLVideoElement>;
};

declare type KernelProps<T> = {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  config: T;
};

declare type KernelInterface = Constructor<KernelInstanceProperties> & KernelStaticProperties;

// 描述类的实例方法
interface KernelInstanceProperties {
  player: unknown | null;
  props: unknown;
  load(props: KernelProps): Promise<unknown>;
  clean(): Promise<unknown>;
}

// 描述类的静态属性
interface KernelStaticProperties {
  name: string;
}

declare type VideoSignal = {
  // 播放状态，loading、waiting 播放按钮显示loading
  loading: boolean;
  waiting: boolean;
  paused: boolean;
  ended: boolean;
  // 播放进度条相关，seeking 状态不允许拖到进度条
  seeking: boolean;
  duration: number;
  currentTime: number;
  buffered: null;
  // 静音设定值
  muted: boolean;
  // 静音实际值
  videoMuted: boolean;
  volume: number;
  playbackRate: number;
  pip: boolean;
  fullscreen: boolean;
  error?: Error | null;
};

declare type dispatchFn = (payload: Partial<VideoSignal>, f?: boolean) => void;
