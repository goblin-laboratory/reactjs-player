import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './index.css';

const Interface = React.memo(({ getPlayer, src }) => {
  // 接口测试
  const [isPlayingResult, setIsPlayingResult] = React.useState('--');
  const [getCurrentTimeResult, setGetCurrentTimeResult] = React.useState('--');
  const [setCurrentTimeResult, setSetCurrentTimeResult] = React.useState('--');
  const [getBufferedResult, setGetBufferedResult] = React.useState('--');
  const [setPlaybackRateResult, setSetPlaybackRateResult] = React.useState('--');
  const [getPlaybackRateResult, setGetPlaybackRateResult] = React.useState('--');
  const [isFullscreenResult, setIsFullscreenResult] = React.useState('--');
  const [isPiPResult, setIsPiPResultResult] = React.useState('--');

  const onIsPlayingClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setIsPlayingResult(player.isPlaying().toString());
    } else {
      setIsPlayingResult('--');
    }
  }, [getPlayer]);

  const onGetCurrentTimeClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      setGetCurrentTimeResult(player.getCurrentTime().toString());
    } else {
      setGetCurrentTimeResult('--');
    }
  }, [getPlayer]);

  React.useEffect(() => {
    setIsPlayingResult('--');
    setGetCurrentTimeResult('--');
    setSetCurrentTimeResult('--');
    setGetBufferedResult('--');
    setSetPlaybackRateResult('--');
    setGetPlaybackRateResult('--');
    setIsFullscreenResult('--');
    setIsPiPResultResult('--');
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
          <td>getCurrentTime</td>
          <td className="testAction" onClick={onGetCurrentTimeClick}>
            <Icon type="play-circle" />
          </td>
          <td>{getCurrentTimeResult}</td>
        </tr>
        <tr>
          <td>setCurrentTime</td>
          <td className="testAction">
            <Icon type="play-circle" />
          </td>
          <td>{setCurrentTimeResult}</td>
        </tr>
        <tr>
          <td>getBuffered</td>
          <td className="testAction">
            <Icon type="play-circle" />
          </td>
          <td>{getBufferedResult}</td>
        </tr>
        <tr>
          <td>setPlaybackRate</td>
          <td className="testAction">
            <Icon type="play-circle" />
          </td>
          <td>{setPlaybackRateResult}</td>
        </tr>
        <tr>
          <td>getPlaybackRate</td>
          <td className="testAction">
            <Icon type="play-circle" />
          </td>
          <td>{getPlaybackRateResult}</td>
        </tr>
        <tr>
          <td>isPiP</td>
          <td className="testAction">
            <Icon type="play-circle" />
          </td>
          <td>{isPiPResult}</td>
        </tr>
        <tr>
          <td>isFullscreen</td>
          <td className="testAction">
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
