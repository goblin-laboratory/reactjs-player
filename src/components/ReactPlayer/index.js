import React from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { Slider, Icon } from 'antd';
import ReactSWF from 'react-swf';
import detect from './utils/detect';
// import delay from './utils/delay';
import { ReactComponent as MutedSvg } from './svgs/muted.svg';
import { ReactComponent as UnmutedSvg } from './svgs/unmuted.svg';
import ProcessSlider from './Slider';
import swf from './swf/GrindPlayer.swf';

import styles from './index.module.less';

export default class ReactPlayer extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isLive: PropTypes.string.isRequired,
  };

  // static defaultProps = {
  //   type: () => {},
  //   desktop: true,
  //   flvjsPath: 'https://cdn.jsdelivr.net/npm/flv.js@latest',
  //   flvjsConfig: {},
  //   hlsjsPath: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
  //   hlsjsConfig: {},
  // };

  constructor(props) {
    super(props);

    this.state = {
      info: null,
      loading: false,
      duration: 0,
      currentTime: 0,
      seeking: false,
      waiting: false,
      buffered: null,
      paused: false,
      muted: false,
      volume: 100,
      // playbackRate: 1,
      errMsg: null,
    };

    this.videoRef = React.createRef();
    this.containerRef = React.createRef();
    this.unmounted = false;
  }

  render() {
    return (
      <div className={styles.container} ref={this.containerRef}>
        <video
          className={styles.video}
          ref={this.videoRef}
          onAbort={this.onMediaEvent}
          onCanPlay={() => this.setStateSafely({ loading: false, waiting: false })}
          onDurationChange={this.onDurationChange}
          onTimeUpdate={this.onTimeUpdate}
          onPause={() => this.setStateSafely({ paused: true })}
          onPlay={() => this.setStateSafely({ paused: false, ended: false })}
          onPlaying={() => this.setStateSafely({ paused: false, ended: false })}
          onEnded={this.onEnded}
          onSeeked={this.onSeeked}
          onSeeking={this.onSeeking}
          onCanPlayThrough={this.onMediaEvent}
          onEmptied={this.onMediaEvent}
          onEncrypted={this.onMediaEvent}
          onError={this.onError}
          onLoadedData={this.onMediaEvent}
          onLoadedMetadata={this.onMediaEvent}
          onLoadStart={this.onMediaEvent}
          onProgress={this.onProgress}
          onRateChange={this.onMediaEvent}
          onStalled={this.onMediaEvent}
          onSuspend={this.onMediaEvent}
          onVolumeChange={this.onMediaEvent}
          onWaiting={() => this.setStateSafely({ waiting: true })}
        />
        {!this.state.info && <div className={styles.videoMask} />}
        {(this.state.loading || this.state.seeking || this.state.waiting) && (
          <div className={styles.loading}>
            <Icon type="loading" />
          </div>
        )}
        {this.state.errMsg && (
          <div className={styles.errMsg}>
            <div>
              Error: {this.state.errMsg.type} ({this.state.errMsg.details})
            </div>
            <div>
              {(this.state.errMsg.response && this.state.errMsg.response.text) || this.state.errMsg.reason || ''}
            </div>
          </div>
        )}
        <div className={styles.controls}>
          <ProcessSlider
            disabled={this.state.loading || this.state.seeking || this.state.waiting || !this.state.info}
            value={this.state.currentTime}
            max={this.state.duration}
            buffered={this.state.buffered}
            onChange={this.seek}
          />
          <div>
            <div className={styles.left}>
              {this.state.ended && (
                <button type="button" onClick={this.restart}>
                  <Icon type="reload" />
                </button>
              )}
              {this.state.paused && !this.state.ended && (
                <button type="button" onClick={this.play}>
                  <Icon type="caret-right" />
                </button>
              )}
              {!this.state.paused && !this.state.ended && (
                <button type="button" onClick={this.pause} disabled={!this.state.info || this.state.loading}>
                  <Icon type="pause" />
                </button>
              )}
              {(this.state.muted || 0 === this.state.volume) && (
                <button type="button" onClick={this.unmute}>
                  <Icon component={MutedSvg} />
                </button>
              )}
              {!this.state.muted && 0 !== this.state.volume && (
                <button type="button" onClick={this.mute}>
                  <Icon component={UnmutedSvg} />
                </button>
              )}
              <span className={styles.volumeSlider}>
                <Slider value={this.state.volume} onChange={this.changeVolume} />
              </span>
              {this.state.info && false !== this.state.info.isLive && (
                <span className={styles.controlText}>
                  <span className={styles.liveDot} />
                  直播
                </span>
              )}
              {this.state.info && false === this.state.info.isLive && 0 < this.state.duration && (
                <span className={styles.controlText}>
                  {this.state.currentTime} / {this.state.duration}
                </span>
              )}
            </div>
            <div className={styles.right}>
              {this.state.fullScreen && (
                <button type="button" onClick={this.exitFullscreen}>
                  <Icon type="fullscreen-exit" />
                </button>
              )}
              {!this.state.fullScreen && (
                <button type="button" onClick={this.requestFullscreen}>
                  <Icon type="fullscreen" />
                </button>
              )}
            </div>
          </div>
        </div>
        {this.state.info && 'rtmp' === this.state.info.protocol && (
          <div className={styles.flash}>
            <ReactSWF
              src={swf}
              width="100%"
              height="100%"
              wmode="opaque"
              allowFullScreen
              allowScriptAccess="always"
              bgcolor="#000000"
              flashVars={{ src: this.state.info.src, autoPlay: true, streamType: 'live' }}
            />
          </div>
        )}
      </div>
    );
  }
}
