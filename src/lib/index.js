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
    protocols: PropTypes.array.isRequired,
    desktop: PropTypes.bool,
    onReady: PropTypes.func,
    hlsjsPath: PropTypes.string,
    hlsjsConfig: PropTypes.object,
    flvjsPath: PropTypes.string,
    flvjsConfig: PropTypes.object,
  };

  static defaultProps = {
    onReady: () => {},
    desktop: true,
    flvjsPath: 'https://cdn.jsdelivr.net/npm/flv.js@latest',
    flvjsConfig: {},
    hlsjsPath: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
    hlsjsConfig: {},
  };

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

  componentDidMount() {
    // this.addLoadEventListener();
    this.onLoad();
    screenfull.on('change', this.onFullscreenChange);
  }

  componentWillUnmount() {
    // this.removeLoadEventListener();
    screenfull.off('change', this.onFullscreenChange);
    this.unmounted = true;
    this.destory();
  }

  onDurationChange = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.state.info && false === this.state.info.isLive) {
      this.setStateSafely({ duration: e.target.duration });
    }
  };

  onTimeUpdate = e => {
    // console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.state.info && false === this.state.info.isLive) {
      this.setStateSafely({ currentTime: e.target.currentTime });
    }
  };

  onEnded = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.state.info && false === this.state.info.isLive) {
      this.setStateSafely({ ended: true });
    }
  };

  onSeeking = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.state.info && false === this.state.info.isLive) {
      this.setStateSafely({ seeking: true, ended: false });
    }
  };

  onSeeked = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.state.info && false === this.state.info.isLive) {
      this.setStateSafely({ seeking: false });
    }
  };

  onProgress = e => {
    if (this.state.info && false === this.state.info.isLive) {
      this.setStateSafely({ buffered: e.target.buffered });
    }
  };

  onError = () => {
    // console.log(e);
    const errMsg = { type: 'MediaError', details: -1, reason: '' };
    if (this.containerRef && this.containerRef.current && this.videoRef.current.error) {
      errMsg.details = this.videoRef.current.error.code;
      errMsg.reason = this.videoRef.current.error.message;
    }
    this.setStateSafely({ errMsg });
  };

  onMediaEvent = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
  };

  onFullscreenChange = () => {
    if (!this.containerRef || !this.containerRef.current) {
      return;
    }
    this.setStateSafely({ fullScreen: !!screenfull.element && this.containerRef.current === screenfull.element });
  };

  async onLoad() {
    this.supported = await detect({
      desktop: this.props.desktop,
      protocols: this.props.protocols,
      flvjsPath: this.props.flvjsPath,
      hlsjsPath: this.props.hlsjsPath,
    });
    this.readied = true;
    this.props.onReady(this.supported);
    return this.supported;
  }

  setStateSafely = state => {
    if (!this.unmounted) {
      this.setState(state);
    }
  };

  play = () => {
    if (this.hls) {
      if (this.videoRef && this.videoRef.current) {
        this.videoRef.current.play();
      }
    } else if (this.flv) {
      this.flv.play();
    }
    this.setState({ paused: false });
  };

  restart = () => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }
    this.seek(0);
    this.setState({ ended: false });
    this.play();
  };

  pause = () => {
    if (this.hls) {
      if (this.videoRef && this.videoRef.current) {
        this.videoRef.current.pause();
      }
    } else if (this.flv) {
      this.flv.pause();
    }
    this.setState({ paused: true });
  };

  seek = currentTime => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }
    this.videoRef.current.currentTime = currentTime;
    this.setState({ currentTime });
  };

  changeVolume = volume => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }
    this.videoRef.current.volume = volume / 100;
    this.setState({ volume });
  };

  mute = () => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }
    this.videoRef.current.muted = true;
    this.setState({ muted: true });
  };

  unmute = () => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }
    if (0 === this.state.volume) {
      this.changeVolume(100);
    }
    this.videoRef.current.muted = false;
    this.setState({ muted: false });
  };

  requestFullscreen = () => {
    if (screenfull.enabled && this.containerRef && this.containerRef.current) {
      screenfull.request(this.containerRef.current);
    }
  };

  exitFullscreen = () => {
    if (screenfull.enabled) {
      screenfull.exit();
    }
  };

  async load(info) {
    if (!this.videoRef || !this.videoRef.current) {
      return false;
    }
    if (!this.supported.find(it => it === info.protocol)) {
      return false;
    }
    this.destory();
    this.info = info;
    this.setState({ loading: true });
    if ('hls' === info.protocol) {
      this.loadHls(info);
    } else if ('flv' === info.protocol) {
      this.flv = global.flvjs.createPlayer({ type: 'flv', url: info.src, isLive: true });
      this.flv.attachMediaElement(this.videoRef.current);
      this.flv.load();
      this.play();
      this.setState({ info, loading: false });
    } else {
      this.setState({ info, loading: false });
    }
    return true;
  }

  loadHls(info) {
    this.hls = new global.Hls({ debug: true });
    this.hls.loadSource(info.src);
    this.hls.attachMedia(this.videoRef.current);
    this.hls.on(global.Hls.Events.MANIFEST_PARSED, () => {
      this.play();
      this.setStateSafely({ info });
    });
    this.hls.on(global.Hls.Events.ERROR, (e, data) => {
      if (!this.hls || !data.fatal) {
        return;
      }
      this.setStateSafely({ errMsg: data, loading: false });
    });
  }

  destory() {
    this.destoryHls();

    if (this.flv) {
      try {
        this.flv.pause();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.flv.unload();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.flv.destroy();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.flv.detachMediaElement();
      } catch (errMsg) {
        // debugger;
      }
    }
    this.flv = null;

    this.info = null;
    this.setStateSafely({
      info: null,
      loading: false,
      duration: 0,
      currentTime: 0,
      seeking: false,
      buffered: null,
      paused: false,
      fullScreen: false,
      errMsg: null,
    });
  }

  destoryHls() {
    if (this.hls) {
      if (this.videoRef && this.videoRef.current) {
        this.videoRef.current.pause();
      }
      try {
        this.hls.stopLoad();
        this.hls.detachMedia();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.hls.destory();
      } catch (errMsg) {
        // debugger;
      }
    }
    this.hls = null;
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
