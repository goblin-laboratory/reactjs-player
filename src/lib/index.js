import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Icon } from 'antd';
import ReactSWF from 'react-swf';
import detect from './utils/detect';
import { ReactComponent as MutedSvg } from './svgs/muted.svg';
import { ReactComponent as UnmutedSvg } from './svgs/unmuted.svg';
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
  }

  componentWillUnmount() {
    // this.removeLoadEventListener();
    this.unmounted = true;
    this.destory();
  }

  onDurationChange = e => {
    console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ duration: e.target.duration });
  };

  onCanPlay = e => {
    console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted) {
      return;
    }
    this.setState({ loading: false });
  };

  onTimeUpdate = e => {
    // console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ currentTime: e.target.currentTime });
  };

  onPause = e => {
    console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ paused: true });
  };

  onPlay = e => {
    console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ paused: false, ended: false });
  };

  onEnded = e => {
    console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
    if (this.unmounted || this.state.isLive) {
      return;
    }
    this.setState({ ended: true });
  };

  onAbort = e => {
    if (this.unmounted) {
      return;
    }
    console.log('%cInfo:%c %s', 'color: green', 'color: black', e.type);
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
        />
        {!this.state.src && <div className={styles.videoMask} />}
        {this.state.loading && (
          <div className={styles.loading}>
            <Icon type="loading" />
          </div>
        )}
        <div className={styles.controls}>
          <div className={styles.progressSlider}>
            <Slider
              max={this.state.isLive || 0 === this.state.duration ? 100 : this.state.duration}
              value={this.state.isLive ? 100 : this.state.currentTime}
              tipFormatter={this.state.isLive ? null : v => v}
              disabled={!this.state.isLive && 0 === this.state.duration}
              onChange={this.seek}
            />
          </div>
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
              {this.state.isLive && (
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
                <button type="button">
                  <Icon type="fullscreen-exit" />
                </button>
              )}
              {!this.state.fullScreen && (
                <button type="button">
                  <Icon type="fullscreen" />
                </button>
              )}
            </div>
          </div>
        </div>
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
