import { memo } from 'react';
import useRefs from './useRefs';
import useVideoSignal from './useVideoSignal';
import { useSubscriptions } from '../../subscriptions';
import KernelFactory from '../KernelFactory';
import { PlayerProvider } from '../PlayerContext';

function ReactjsPlayer(props: PlayerProps) {
  const { videoRef, playerRef } = useRefs(props);
  const { signal, dispatch } = useVideoSignal(props?.src);
  useSubscriptions({ videoRef, signal, dispatch });

  return (
    <div
      ref={playerRef}
      {...props.playerProps}
      style={{ position: 'relative', width: '100%', height: '100%', ...props.playerProps?.style }}
    >
      <KernelFactory kernel={props.kernel} videoRef={videoRef} src={props.src} config={props.config} />
      <video
        ref={videoRef}
        autoPlay
        controls={false}
        preload="metadata"
        {...props.videoProps}
        style={{ position: 'relative', display: 'block', width: '100%', height: '100%', ...props.videoProps?.style }}
      />
      <PlayerProvider signal={signal} dispatch={dispatch}>
        {props.children}
      </PlayerProvider>
    </div>
  );
}

export default memo(ReactjsPlayer, (prevProps, nextProps) => prevProps.src === nextProps.src);
