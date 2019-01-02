import React from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { Slider, Icon } from 'antd';
import ReactSWF from 'react-swf';
import detect from './utils/detect';
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
      src: '',
      isLive: true,
      loading: false,
      duration: 0,
      currentTime: 0,
      seeking: false,
      waiting: false,
      buffered: [],
      paused: false,
      muted: false,
      volume: 100,
      playbackRate: 1,
    };

    this.loaded = false;
    this.readied = false;
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
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ duration: e.target.duration });
  };

  onCanPlay = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted) {
      return;
    }
    this.setState({ loading: false, waiting: false });
  };

  onTimeUpdate = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ currentTime: e.target.currentTime });
  };

  onPause = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ paused: true });
  };

  onPlay = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ paused: false, ended: false });
  };

  onEnded = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ ended: true });
  };

  onSeeking = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ seeking: true, ended: false });
  };

  onSeeked = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ seeking: false });
  };

  onWaiting = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ waiting: true });
  };

  onProgress = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ buffered: e.target.buffered });
  };

  onMediaEvent = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      // return;
    }
    // this.setState({ seeking: false });
  };

  onAbort = e => {
    console.log('%cMedia Event:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted) {
      // return;
    }
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

  onFullscreenChange = () => {
    if (this.unmounted || !this.containerRef || !this.containerRef.current) {
      return;
    }
    this.setState({ fullScreen: !!screenfull.element && this.containerRef.current === screenfull.element });
  };

  hlsEventHandle = e => {
    console.log('%cHLS Event:%c %s', 'color: green', 'color: black', e);
  };

  hlsErrorEventHandle = e => {
    if (e.fatal) {
      console.log('%cHLS Event:%c %s (%s)', 'color: red', 'color: black', e.type, e.details);
    } else {
      console.log('%cHLS Event:%c %s (%s)', 'color: yellow', 'color: black', e.type, e.details);
    }
    if (!this.hls || this.unmounted) {
      return;
    }
    if (!e.fatal) {
      this.setState({ errMsg: null });
      return;
    }
    switch (e.details) {
      case global.Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: (e.response && e.response.text) || 'manifest loading fails because of a network error',
          },
        });
        break;
      case global.Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: 'manifest loading fails because of a timeout',
          },
        });
        break;
      case global.Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: e.reason || 'manifest parsing failed to find proper content',
          },
        });
        break;
      case global.Hls.ErrorDetails.LEVEL_LOAD_ERROR:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: (e.response && e.response.text) || 'level loading fails because of a network error',
          },
        });
        break;
      case global.Hls.ErrorDetails.FRAG_LOAD_ERROR:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: (e.response && e.response.text) || 'fragment loading fails because of a network error',
          },
        });
        break;
      case global.Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: (e.response && e.response.text) || 'fragment loading fails because of a network error',
          },
        });
        break;
      case global.Hls.ErrorDetails.KEY_LOAD_TIMEOUT:
        this.setState({
          errMsg: {
            type: e.type,
            details: e.details,
            text: (e.response && e.response.text) || 'decrypt key loading fails because of a timeout',
          },
        });
        break;
      default:
        this.setState({ errMsg: null });
        debugger;
    }
  };

  // addLoadEventListener = () => {
  //   document.body.addEventListener('click', this.loadEventHandle);
  // };

  // loadEventHandle = () => {
  //   if (!this.videoRef || !this.videoRef.current) {
  //     return;
  //   }
  //   if (!this.loaded) {
  //     this.videoRef.current.src = '';
  //     this.videoRef.current.load();
  //   }
  //   this.removeLoadEventListener();
  // };

  // removeLoadEventListener = () => {
  //   document.body.removeEventListener('click', this.loadEventHandle);
  //   this.loaded = true;
  // };

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
    } else {
      // Ignore or do something else
    }
  };

  exitFullscreen = () => {
    if (screenfull.enabled) {
      screenfull.exit();
    } else {
      // Ignore or do something else
    }
  };

  load({ protocol, src, isLive = false }) {
    if (!this.videoRef || !this.videoRef.current) {
      return false;
    }
    if (!this.supported.find(it => it === protocol)) {
      return false;
    }
    if (this.state.src) {
      this.destory();
    }
    this.protocol = protocol;
    this.src = src;
    this.setState({ loading: true });
    if ('hls' === protocol) {
      this.hls = new global.Hls();
      this.hls.loadSource(src);
      this.hls.attachMedia(this.videoRef.current);
      this.hls.on(global.Hls.Events.MANIFEST_PARSED, () => {
        this.play();
        this.setState({ protocol, src, isLive });
      });
      this.addHlsEventListener(this.hls);
    } else if ('flv' === protocol) {
      this.flv = global.flvjs.createPlayer({ type: 'flv', url: src, isLive: true });
      this.flv.attachMediaElement(this.videoRef.current);
      this.flv.load();
      this.play();
      this.setState({ protocol, src, isLive, loading: false });
    } else {
      this.setState({ protocol, src, isLive, loading: false });
    }
    return true;
  }

  addHlsEventListener(hls) {
    hls.on(global.Hls.Events.MEDIA_ATTACHING, this.hlsEventHandle);
    hls.on(global.Hls.Events.MEDIA_ATTACHED, this.hlsEventHandle);
    hls.on(global.Hls.Events.MEDIA_DETACHING, this.hlsEventHandle);
    hls.on(global.Hls.Events.MEDIA_DETACHED, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_RESET, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_CODECS, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_CREATED, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_APPENDING, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_APPENDED, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_EOS, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_FLUSHING, this.hlsEventHandle);
    hls.on(global.Hls.Events.BUFFER_FLUSHED, this.hlsEventHandle);
    hls.on(global.Hls.Events.MANIFEST_LOADING, this.hlsEventHandle);
    hls.on(global.Hls.Events.MANIFEST_LOADED, this.hlsEventHandle);
    hls.on(global.Hls.Events.MANIFEST_PARSED, this.hlsEventHandle);
    hls.on(global.Hls.Events.LEVEL_SWITCHING, this.hlsEventHandle);
    hls.on(global.Hls.Events.LEVEL_SWITCHED, this.hlsEventHandle);
    hls.on(global.Hls.Events.LEVEL_LOADING, this.hlsEventHandle);
    hls.on(global.Hls.Events.LEVEL_LOADED, this.hlsEventHandle);
    hls.on(global.Hls.Events.LEVEL_UPDATED, this.hlsEventHandle);
    hls.on(global.Hls.Events.LEVEL_PTS_UPDATED, this.hlsEventHandle);
    hls.on(global.Hls.Events.AUDIO_TRACKS_UPDATED, this.hlsEventHandle);
    hls.on(global.Hls.Events.AUDIO_TRACK_SWITCHING, this.hlsEventHandle);
    hls.on(global.Hls.Events.AUDIO_TRACK_SWITCHED, this.hlsEventHandle);
    hls.on(global.Hls.Events.AUDIO_TRACK_LOADING, this.hlsEventHandle);
    hls.on(global.Hls.Events.AUDIO_TRACK_LOADED, this.hlsEventHandle);
    hls.on(global.Hls.Events.SUBTITLE_TRACKS_UPDATED, this.hlsEventHandle);
    hls.on(global.Hls.Events.SUBTITLE_TRACK_SWITCH, this.hlsEventHandle);
    hls.on(global.Hls.Events.SUBTITLE_TRACK_LOADING, this.hlsEventHandle);
    hls.on(global.Hls.Events.SUBTITLE_TRACK_LOADED, this.hlsEventHandle);
    hls.on(global.Hls.Events.SUBTITLE_FRAG_PROCESSED, this.hlsEventHandle);
    hls.on(global.Hls.Events.INIT_PTS_FOUND, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_LOADING, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_LOAD_PROGRESS, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_LOADED, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_DECRYPTED, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_PARSING_INIT_SEGMENT, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_PARSING_USERDATA, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_PARSING_METADATA, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_PARSING_DATA, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_PARSED, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_BUFFERED, this.hlsEventHandle);
    hls.on(global.Hls.Events.FRAG_CHANGED, this.hlsEventHandle);
    hls.on(global.Hls.Events.FPS_DROP, this.hlsEventHandle);
    hls.on(global.Hls.Events.FPS_DROP_LEVEL_CAPPING, this.hlsEventHandle);
    hls.on(global.Hls.Events.DESTROYING, this.hlsEventHandle);
    hls.on(global.Hls.Events.KEY_LOADING, this.hlsEventHandle);
    hls.on(global.Hls.Events.KEY_LOADED, this.hlsEventHandle);
    hls.on(global.Hls.Events.STREAM_STATE_TRANSITION, this.hlsEventHandle);
    hls.on(global.Hls.Events.ERROR, this.hlsErrorEventHandle);
  }

  destory() {
    if (this.hls) {
      try {
        if (this.videoRef && this.videoRef.current) {
          this.videoRef.current.pause();
        }
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.hls.stopLoad();
      } catch (errMsg) {
        // debugger;
      }
      try {
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

    this.protocol = '';
    this.src = '';
    if (this.unmounted) {
      this.setState({
        // src: '',
        loading: false,
        isLive: true,
        duration: 0,
        currentTime: 0,
        seeking: false,
        buffered: [],
        paused: false,
        fullScreen: false,
      });
    }
  }

  render() {
    return (
      <div className={styles.container} ref={this.containerRef}>
        <video
          className={styles.video}
          ref={this.videoRef}
          onAbort={this.onAbort}
          onCanPlay={this.onCanPlay}
          onDurationChange={this.onDurationChange}
          onTimeUpdate={this.onTimeUpdate}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onPlaying={this.onPlay}
          onEnded={this.onEnded}
          onSeeked={this.onSeeked}
          onSeeking={this.onSeeking}
          onCanPlayThrough={this.onMediaEvent}
          onEmptied={this.onMediaEvent}
          onEncrypted={this.onMediaEvent}
          onError={this.onMediaEvent}
          onLoadedData={this.onMediaEvent}
          onLoadedMetadata={this.onMediaEvent}
          onLoadStart={this.onMediaEvent}
          onProgress={this.onProgress}
          onRateChange={this.onMediaEvent}
          onStalled={this.onMediaEvent}
          onSuspend={this.onMediaEvent}
          onVolumeChange={this.onMediaEvent}
          onWaiting={this.onWaiting}
        />
        {!this.state.src && <div className={styles.videoMask} />}
        <div className={styles.controls}>
          <ProcessSlider
            isLive={this.state.isLive}
            currentTime={this.state.currentTime}
            duration={this.state.duration}
            buffered={this.state.buffered}
            onChange={this.seek}
          />
          {/* <div className={styles.progressSlider}>
            <Slider
              max={this.state.isLive || 0 === this.state.duration ? 100 : this.state.duration}
              value={this.state.isLive ? 100 : this.state.currentTime}
              tipFormatter={this.state.isLive ? null : v => v}
              disabled={!this.state.isLive && 0 === this.state.duration}
              onChange={this.seek}
            />
          </div> */}
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
                <button type="button" onClick={this.pause}>
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
              {this.state.isLive && this.state.src && (
                <span className={styles.controlText}>
                  <span className={styles.liveDot} />
                  直播
                </span>
              )}
              {!this.state.isLive && 0 < this.state.duration && (
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
        {(this.state.loading || this.state.seeking || this.state.waiting) && (
          <div className={styles.loading}>
            <Icon type="loading" />
          </div>
        )}
        {'rtmp' === this.state.protocol && (
          <div className={styles.flash}>
            <ReactSWF
              src={swf}
              width="100%"
              height="100%"
              wmode="opaque"
              allowFullScreen
              allowScriptAccess="always"
              bgcolor="#000000"
              flashVars={{
                src: this.state.src,
                autoPlay: true,
                streamType: 'live',
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
