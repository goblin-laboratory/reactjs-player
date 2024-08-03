import React from 'react';
import { signal } from '@preact/signals';

function ReactjsPlayer(props: {
  videoRef?: React.RefObject<HTMLVideoElement>;
  src?: string;
  config?: unknown;
  playerProps?: any;
  videoProps?: any;
  controls?: 'controls' | boolean;
  muted?: boolean;
  children?: React.ReactNode;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<HTMLVideoElement>(null);
  const signals = signal<ReactjsPlayerSignals>({
    loading: false,
    prevented: false,
    paused: false,
    ended: false,
    seeking: false,
    waiting: false,
    duration: 0,
    currentTime: 0,
    buffered: null,
    muted: true === props.muted,
    volume: 1,
    playbackRate: 1,
    pip: false,
    fullscreen: false,
    error: null,
  });
  const ref = props?.videoRef || videoRef;

  return (
    <div ref={playerRef} {...props.playerProps}>
      <video
        ref={ref}
        controls={'controls' === props.controls}
        // type={type}
        autoPlay
        preload="metadata"
        {...props.videoProps}
      />
      {React.Children.map(props.children, (child) => {
        // 如果子元素不是有效的 React 元素，则返回 null
        if (!React.isValidElement(child)) {
          return null;
        }
        // 使用 React.cloneElement() 函数为子元素增加属性
        return React.cloneElement(child, { signals: signals, videoRef: ref } as any);
      })}
    </div>
  );
}

export default ReactjsPlayer;
