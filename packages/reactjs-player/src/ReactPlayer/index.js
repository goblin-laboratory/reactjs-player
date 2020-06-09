/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import useVideoState from '@reactjs-player/use-state';
import useTime from '@reactjs-player/use-time';
import useVolume from '@reactjs-player/use-volume';
import usePlaybackRate from '@reactjs-player/use-playback-rate';
import usePiP from '@reactjs-player/use-pip';
import useFullscreen from '@reactjs-player/use-fullscreen';
import useAutoplay from '@reactjs-player/use-autoplay';

import Flvjs from '../Flvjs';
import Hlsjs from '../Hlsjs';
import Native from '../Native';
import ReactPlayerSkinWapper from '../ReactPlayerSkinWapper';
import ReactPlayerContext from '../ReactPlayerContext';
import styles from './index.module.less';

const ReactjsPlayer = ({
  kernel,
  live,
  config = null,
  onKernelError,

  src = '',
  type,
  controls = true,
  muted = false,
  // autoPlay = true,

  className = '',
  videoProps = null,
  playerProps = null,
  children = null,
}) => {
  const [kernelMsg, setKernelMsg] = React.useState(null);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);
  const onMsgChange = React.useCallback(
    msg => {
      setKernelMsg(msg);
      onKernelError(msg);
    },
    [onKernelError],
  );

  const stateProps = useVideoState(src, getVideoElement);
  const timeProps = useTime(src, getVideoElement);
  const volumeProps = useVolume(getVideoElement, muted);
  const playbackRateProps = usePlaybackRate(live, getVideoElement);
  const piPProps = usePiP(src, getVideoElement);
  const fullscreenProps = useFullscreen(getVideoElement, getPlayerElement);
  useAutoplay(src, getVideoElement, stateProps.prevented);

  const kernelProps = { getVideoElement, src, config, onMsgChange };

  return (
    <div className={`${styles.reactPlayer} ${className}`} ref={playerRef} {...playerProps}>
      {'flvjs' === kernel && <Flvjs {...kernelProps} />}
      {'hlsjs' === kernel && <Hlsjs {...kernelProps} />}
      {'native' === kernel && <Native {...kernelProps} />}
      <video className={styles.video} ref={videoRef} controls={'controls' === controls} type={type} {...videoProps} />
      <ReactPlayerContext.Provider
        value={{
          getVideoElement,
          live,
          src,
          controls,
          ...stateProps,
          ...timeProps,
          ...volumeProps,
          ...playbackRateProps,
          ...piPProps,
          ...fullscreenProps,
          kernelMsg,
        }}
      >
        {true === controls && <ReactPlayerSkinWapper />}
        {children}
      </ReactPlayerContext.Provider>
    </div>
  );
};

ReactjsPlayer.propTypes = {
  kernel: PropTypes.oneOf(['hlsjs', 'flvjs', 'native']).isRequired,
  live: PropTypes.bool.isRequired,
  config: PropTypes.object,
  onKernelError: PropTypes.func,

  src: PropTypes.string,
  type: PropTypes.string.isRequired,
  controls: PropTypes.oneOf([false, true, 'controls']),
  muted: PropTypes.bool,
  // autoPlay: PropTypes.bool,

  className: PropTypes.string,
  videoProps: PropTypes.object,
  playerProps: PropTypes.object,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ReactjsPlayer.defaultProps = {
  config: null,
  onKernelError: () => {},

  src: '',
  controls: true,
  muted: false,
  // autoPlay: true,

  className: '',
  videoProps: null,
  playerProps: null,

  children: null,
};

export default React.memo(ReactjsPlayer);
