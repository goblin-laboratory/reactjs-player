import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Icon } from 'antd';
import utils from './utils';
import { ReactComponent as MutedSvg } from './muted.svg';
import { ReactComponent as UnmutedSvg } from './unmuted.svg';

import styles from './index.module.less';

export default class NativeHls extends React.PureComponent {
  static propTypes = {
    onLoadFinished: PropTypes.func,
    hlsjsConfig: PropTypes.object,
    flvjsConfig: PropTypes.object,
  };

  static defaultProps = {
    onLoadFinished: () => {},
    isDesktop: true,
    hlsjsConfig: {
      path: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
    },
    flvjsConfig: {
      path: 'https://cdn.jsdelivr.net/npm/flv.js@latest',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      src: '',
      isLive: true,
      // type: '',
      // supported: [],
    };

    this.loaded = false;
    this.videoRef = React.createRef();
    this.containerRef = React.createRef();
    this.unmounted = false;
  }

  componentDidMount() {
    this.addLoadEventListener();
    this.onLoad();
  }

  componentWillUnmount() {
    this.removeLoadEventListener();
    this.unmounted = true;
  }

  async onLoad() {
    const supported = [];
    if (this.props.isDesktop) {
      supported.push('rtmp');
      if (-1 !== (this.props.protocols || []).find(it => 'hls' === it)) {
        if (!global.Hls) {
          await utils.getScript(this.props.hlsjsConfig.path);
        }
        if (this.unmounted) {
          return [];
        }
        if (global.Hls && global.Hls.isSupported()) {
          supported.unshift('hls');
        }
      }
      if (-1 !== (this.props.protocols || []).find(it => 'flv' === it)) {
        if (!global.flvjs) {
          await utils.getScript(this.props.flvjsConfig.path);
        }
        if (this.unmounted) {
          return [];
        }
        if (global.flvjs && global.flvjs.isSupported() && global.flvjs.getFeatureList().networkStreamIO) {
          supported.unshift('flv');
        }
      }
    } else {
      supported.push('hls');
    }
    this.supported = supported;
    this.props.onLoadFinished(supported);
    return supported;
  }

  addLoadEventListener = () => {
    document.body.addEventListener('click', this.loadEventHandle);
  };

  loadEventHandle = () => {
    if (!this.videoRef || !this.videoRef.current) {
      return;
    }
    if (!this.loaded) {
      this.videoRef.current.src = '';
      this.videoRef.current.load();
    }
    this.removeLoadEventListener();
  };

  removeLoadEventListener = () => {
    document.body.removeEventListener('click', this.loadEventHandle);
    this.loaded = true;
  };

  play = () => {
    if (this.hls) {
      if (this.videoRef && this.videoRef.current) {
        this.videoRef.current.play();
      }
    } else if (this.flv) {
      this.flv.play();
    }
  };

  pause = () => {
    if (this.hls) {
      if (this.videoRef && this.videoRef.current) {
        this.videoRef.current.pause();
      }
    } else if (this.flv) {
      this.flv.pause();
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
    if ('hls' === protocol) {
      if (this.props.isDesktop) {
        this.hls = new global.Hls();
        this.hls.loadSource(src);
        this.hls.attachMedia(this.videoRef.current);
        this.hls.on(global.Hls.Events.MANIFEST_PARSED, () => {
          this.play();
          this.setState({ protocol, src, isLive });
        });
      } else {
        this.videoRef.current.src = src;
        this.videoRef.current.load();
        this.play();
      }
    } else if ('flv' === protocol) {
      this.flv = global.flvjs.createPlayer({ type: 'flv', url: src, isLive: true });
      this.flv.attachMediaElement(this.videoRef.current);
      this.flv.load();
      this.play();
      this.setState({ protocol, src, isLive });
    } else {
      this.setState({ protocol, src, isLive });
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
  }

  render() {
    return (
      <div className={styles.container} ref={this.containerRef}>
        <video
          className={styles.video}
          ref={this.videoRef}
          controls="controls"
          preload="auto"
          autoPlay=""
          webkit-playsinline="true"
          playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="landscape|portrait"
          onAbort={this.onAbort}
          onCanPlay={this.onCanPlay}
          onCanPlayThrough={this.onCanPlayThrough}
          onDurationChange={this.onDurationChange}
          onEmptied={this.onEmptied}
          onEncrypted={this.onEncrypted}
          onEnded={this.onEnded}
          onError={this.onError}
          onLoadedData={this.onLoadedData}
          onLoadedMetadata={this.onLoadedMetadata}
          onLoadStart={this.onLoadStart}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onPlaying={this.onPlaying}
          onProgress={this.onProgress}
          onRateChange={this.onRateChange}
          onSeeked={this.onSeeked}
          onSeeking={this.onSeeking}
          onStalled={this.onStalled}
          onSuspend={this.onSuspend}
          onTimeUpdate={this.onTimeUpdate}
          onVolumeChange={this.onVolumeChange}
          onWaiting={this.onWaiting}
        >
          <source src="" type="application/x-mpegURL" />
        </video>
        {!this.state.src && <div className={styles.videoMask} />}
        <div className={styles.controls}>
          <div className={styles.progressSlider}>
            <Slider />
          </div>
          <div>
            <div className={styles.left}>
              <button type="button">
                <Icon type="caret-right" />
              </button>
              <button type="button">
                <Icon type="pause" />
              </button>
              <button type="button">
                <Icon component={MutedSvg} />
              </button>
              <button type="button">
                <Icon component={UnmutedSvg} />
              </button>
              <span className={styles.volumeSlider}>
                <Slider />
              </span>
              {this.state.isLive && (
                <span className={styles.controlText}>
                  <span className={styles.liveDot} />
                  直播
                </span>
              )}
              {!this.state.isLive && <span className={styles.controlText}>00:00 / 1:00:00</span>}
            </div>
            <div className={styles.right}>
              <button type="button">
                <Icon type="fullscreen-exit" />
              </button>
              <button type="button">
                <Icon type="fullscreen" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
