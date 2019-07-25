import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './index.css';

const Interface = React.memo(({ getPlayer, src }) => {
  // 接口测试
  const [isPlayingResult, setIsPlayingResult] = React.useState('--');
  const [getDurationResult, setGetDurationResult] = React.useState('--');
  const [getCurrentTimeResult, setGetCurrentTimeResult] = React.useState('--');
  const [setCurrentTimeResult, setSetCurrentTimeResult] = React.useState('--');
  const [getBufferedResult, setGetBufferedResult] = React.useState('--');
  const [getVolumeResult, setGetVolumeResult] = React.useState('--');
  const [setVolumeResult, setSetVolumeResult] = React.useState('--');
  const [isMutedResult, setIsMutedResult] = React.useState('--');
  const [toggleMuteResult, setToggleMuteResult] = React.useState('--');
  const [setPlaybackRateResult, setSetPlaybackRateResult] = React.useState('--');
  const [getPlaybackRateResult, setGetPlaybackRateResult] = React.useState('--');
  const [isFullscreenResult, setIsFullscreenResult] = React.useState('--');
  const [isPiPResult, setIsPiPResult] = React.useState('--');

  // isPlaying
  const onIsPlayingClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setIsPlayingResult(player.isPlaying().toString());
    } else {
      setIsPlayingResult('--');
    }
  }, [getPlayer]);

  // getDuration
  const onGetDurationClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setGetDurationResult(player.getDuration().toString());
    } else {
      setGetDurationResult('--');
    }
  }, [getPlayer]);

  // getCurrentTime
  const onGetCurrentTimeClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setGetCurrentTimeResult(player.getCurrentTime().toString());
    } else {
      setGetCurrentTimeResult('--');
    }
  }, [getPlayer]);

  // setCurrentTime
  const onSetCurrentTimeClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      const duration = player.getDuration();
      if (0 < duration) {
        player.setCurrentTime(duration / 2);
        setSetCurrentTimeResult('true');
      } else {
        setSetCurrentTimeResult('false');
      }
    } else {
      setSetCurrentTimeResult('--');
    }
  }, [getPlayer]);

  // getBuffered
  const onGetBufferedClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      const buffered = player.getBuffered();
      if (buffered) {
        setGetBufferedResult(`${buffered.start(buffered.length - 1)}-${buffered.end(buffered.length - 1)}`);
      } else {
        setGetBufferedResult('null');
      }
    } else {
      setGetBufferedResult('--');
    }
  }, [getPlayer]);

  // getVolume
  const onGetVolumeClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setGetVolumeResult(player.getVolume().toString());
    } else {
      setGetVolumeResult('--');
    }
  }, [getPlayer]);

  // setVolume
  const onSetVolumeClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      const v = 1 === player.getVolume() ? 0.5 : 1;
      player.setVolume(v);
      setSetVolumeResult('true');
    } else {
      setSetVolumeResult('--');
    }
  }, [getPlayer]);

  // isMuted
  const onIsMutedClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setIsMutedResult(player.isMuted().toString());
    } else {
      setIsMutedResult('--');
    }
  }, [getPlayer]);

  // toggleMute
  const onToggleMuteClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      player.toggleMute();
      setToggleMuteResult('true');
    } else {
      setToggleMuteResult('--');
    }
  }, [getPlayer]);

  // getPlaybackRate
  const onGetPlaybackRateClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setGetPlaybackRateResult(player.getPlaybackRate().toString());
    } else {
      setGetPlaybackRateResult('--');
    }
  }, [getPlayer]);

  // setPlaybackRate
  const onSetPlaybackRateClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      const rate = 1 === player.getPlaybackRate() ? 1.25 : 1;
      player.setPlaybackRate(rate);
      setSetPlaybackRateResult('true');
    } else {
      setSetPlaybackRateResult('--');
    }
  }, [getPlayer]);

  const onIsPiPClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setIsPiPResult(player.isPiP().toString());
    } else {
      setIsPiPResult('--');
    }
  }, [getPlayer]);

  const onIsFullscreenClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setIsFullscreenResult(player.isFullscreen().toString());
    } else {
      setIsFullscreenResult('--');
    }
  }, [getPlayer]);

  React.useEffect(() => {
    setIsPlayingResult('--');
    setGetDurationResult('--');
    setGetCurrentTimeResult('--');
    setSetCurrentTimeResult('--');
    setGetBufferedResult('--');
    setGetVolumeResult('--');
    setSetVolumeResult('--');
    setIsMutedResult('--');
    setToggleMuteResult('--');
    setSetPlaybackRateResult('--');
    setGetPlaybackRateResult('--');
    setIsFullscreenResult('--');
    setIsPiPResult('--');
  }, [src]);

  return (
    <table className="testTable">
      <thead>
        <tr>
          <th className="methodNameTitle">接口</th>
          <th className="testActionTitle">运行</th>
          <th>结果</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>isPlaying</td>
          <td className="testAction" onClick={onIsPlayingClick}>
            <Icon type="play-circle" />
          </td>
          <td>{isPlayingResult}</td>
        </tr>
        <tr>
          <td>getDuration</td>
          <td className="testAction" onClick={onGetDurationClick}>
            <Icon type="play-circle" />
          </td>
          <td>{getDurationResult}</td>
        </tr>
        <tr>
          <td>getCurrentTime</td>
          <td className="testAction" onClick={onGetCurrentTimeClick}>
            <Icon type="play-circle" />
          </td>
          <td>{getCurrentTimeResult}</td>
        </tr>
        <tr>
          <td>setCurrentTime</td>
          <td className="testAction" onClick={onSetCurrentTimeClick}>
            <Icon type="play-circle" />
          </td>
          <td>{setCurrentTimeResult}</td>
        </tr>
        <tr>
          <td>getBuffered</td>
          <td className="testAction" onClick={onGetBufferedClick}>
            <Icon type="play-circle" />
          </td>
          <td>{getBufferedResult}</td>
        </tr>
        <tr>
          <td>getVolume</td>
          <td className="testAction" onClick={onGetVolumeClick}>
            <Icon type="play-circle" />
          </td>
          <td>{getVolumeResult}</td>
        </tr>
        <tr>
          <td>setVolume</td>
          <td className="testAction" onClick={onSetVolumeClick}>
            <Icon type="play-circle" />
          </td>
          <td>{setVolumeResult}</td>
        </tr>
        <tr>
          <td>isMuted</td>
          <td className="testAction" onClick={onIsMutedClick}>
            <Icon type="play-circle" />
          </td>
          <td>{isMutedResult}</td>
        </tr>
        <tr>
          <td>toggleMute</td>
          <td className="testAction" onClick={onToggleMuteClick}>
            <Icon type="play-circle" />
          </td>
          <td>{toggleMuteResult}</td>
        </tr>
        <tr>
          <td>getPlaybackRate</td>
          <td className="testAction" onClick={onGetPlaybackRateClick}>
            <Icon type="play-circle" />
          </td>
          <td>{getPlaybackRateResult}</td>
        </tr>
        <tr>
          <td>setPlaybackRate</td>
          <td className="testAction" onClick={onSetPlaybackRateClick}>
            <Icon type="play-circle" />
          </td>
          <td>{setPlaybackRateResult}</td>
        </tr>
        <tr>
          <td>isPiP</td>
          <td className="testAction" onClick={onIsPiPClick}>
            <Icon type="play-circle" />
          </td>
          <td>{isPiPResult}</td>
        </tr>
        <tr>
          <td>isFullscreen</td>
          <td className="testAction" onClick={onIsFullscreenClick}>
            <Icon type="play-circle" />
          </td>
          <td>{isFullscreenResult}</td>
        </tr>
      </tbody>
    </table>
  );
});

Interface.propTypes = {
  getPlayer: PropTypes.func.isRequired,
  src: PropTypes.string,
};

Interface.defaultProps = {
  src: '',
};

export default Interface;
