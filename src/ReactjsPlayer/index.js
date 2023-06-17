import React from 'react';
import PropTypes from 'prop-types';

import SRSWebRTC from '../SRSWebRTC';
import AliRTS from '../AliRTS';
import Flvjs from '../Flvjs';
import Hlsjs from '../Hlsjs';
import Native from '../Native';
import PlayerSkinWapper from '../PlayerSkinWapper';
import PlayerContext from '../PlayerContext';
import useReactjsPlayer from './useReactjsPlayer';
import styles from './index.module.less';

const ReactjsPlayer = ({
  kernel,
  live,
  config,
  onKernelError,
  src,
  type,
  controls,
  className,
  videoProps,
  playerProps,
  children,
}) => {
  const {
    videoRef,
    playerRef,
    loading,
    prevented,
    paused,
    ended,
    seeking,
    waiting,
    duration,
    currentTime,
    buffered,
    muted,
    volume,
    playbackRate,
    pictureInPictureEnabled,
    pip,
    fullscreen,
    kernelMsg,
    getVideoElement,
    onPauseClick,
    onPlayClick,
    changeCurrentTime,
    onMutedClick,
    changeVolume,
    changePlaybackRate,
    requestPictureInPicture,
    exitPictureInPicture,
    requestFullscreen,
    exitFullscreen,
    onMsgChange,
  } = useReactjsPlayer({ src, live, onKernelError });

  const kernelProps = { getVideoElement, src, config, onMsgChange };

  return (
    <div className={`${styles.reactjsPlayer} ${className}`} ref={playerRef} {...playerProps}>
      {'srswebrtc' === kernel && <SRSWebRTC {...kernelProps} onPlayClick={onPlayClick} />}
      {'alirts' === kernel && <AliRTS {...kernelProps} />}
      {'flvjs' === kernel && <Flvjs {...kernelProps} />}
      {'hlsjs' === kernel && <Hlsjs {...kernelProps} />}
      {'native' === kernel && <Native {...kernelProps} onPlayClick={onPlayClick} />}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className={styles.video}
        ref={videoRef}
        controls={'controls' === controls}
        type={type}
        autoPlay
        preload="metadata"
        {...videoProps}
      />
      <PlayerContext.Provider
        value={{
          live,
          src,
          loading,
          prevented,
          paused,
          ended,
          seeking,
          waiting,
          duration,
          currentTime,
          buffered,
          muted,
          volume,
          playbackRate,
          pictureInPictureEnabled,
          pip,
          fullscreen,
          kernelMsg,
          getVideoElement,
          onPauseClick,
          onPlayClick,
          changeCurrentTime,
          onMutedClick,
          changeVolume,
          changePlaybackRate,
          requestPictureInPicture,
          exitPictureInPicture,
          requestFullscreen,
          exitFullscreen,
        }}
      >
        {true === controls && <PlayerSkinWapper />}
        {children}
      </PlayerContext.Provider>
    </div>
  );
};

ReactjsPlayer.propTypes = {
  kernel: PropTypes.oneOf(['srswebrtc', 'alirts', 'flvjs', 'hlsjs', 'native']).isRequired,
  live: PropTypes.bool.isRequired,
  config: PropTypes.object,
  onKernelError: PropTypes.func,

  src: PropTypes.string,
  type: PropTypes.string.isRequired,
  controls: PropTypes.oneOf([false, true, 'controls']),

  className: PropTypes.string,
  videoProps: PropTypes.object,
  playerProps: PropTypes.object,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ReactjsPlayer.defaultProps = {
  config: null,
  onKernelError: null,

  src: '',
  controls: true,

  className: '',
  videoProps: null,
  playerProps: null,

  children: null,
};

export default React.memo(
  ReactjsPlayer,
  (p, n) =>
    p.kernel === n.kernel &&
    p.live === n.live &&
    p.config === n.config &&
    p.onKernelError === n.onKernelError &&
    p.src === n.src &&
    p.type === n.type &&
    p.controls === n.controls &&
    p.className === n.className &&
    p.videoProps === n.videoProps &&
    p.playerProps === n.playerProps &&
    p.children === n.children,
);
