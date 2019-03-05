import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.less';

export default class FlvjsPlayer extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
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
  }

  componentWillUnmount() {
    if (this.flvPlayer) {
      try {
        this.flvPlayer.pause();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.flvPlayer.unload();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.flvPlayer.destroy();
      } catch (errMsg) {
        // debugger;
      }
      try {
        this.flvPlayer.detachMediaElement();
      } catch (errMsg) {
        // debugger;
      }
    }
    this.flvPlayer = null;
  }

  async onLoad() {
    if (this.videoRef && this.videoRef.current) {
      this.flvPlayer = global.flvjs.createPlayer({ type: 'flv', url: this.props.src });
      this.flvPlayer.attachMediaElement(this.videoRef.current);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
  }

  render() {
    const { src, ...props } = this.props;
    return (
      <video
        className={styles.video}
        ref={this.videoRef}
        {...props}
        // onAbort={this.onMediaEvent}
        // onCanPlay={() => this.setStateSafely({ loading: false, waiting: false })}
        // onDurationChange={this.onDurationChange}
        // onTimeUpdate={this.onTimeUpdate}
        // onPause={() => this.setStateSafely({ paused: true })}
        // onPlay={() => this.setStateSafely({ paused: false, ended: false })}
        // onPlaying={() => this.setStateSafely({ paused: false, ended: false })}
        // onEnded={this.onEnded}
        // onSeeked={this.onSeeked}
        // onSeeking={this.onSeeking}
        // onCanPlayThrough={this.onMediaEvent}
        // onEmptied={this.onMediaEvent}
        // onEncrypted={this.onMediaEvent}
        // onError={this.onError}
        // onLoadedData={this.onMediaEvent}
        // onLoadedMetadata={this.onMediaEvent}
        // onLoadStart={this.onMediaEvent}
        // onProgress={this.onProgress}
        // onRateChange={this.onMediaEvent}
        // onStalled={this.onMediaEvent}
        // onSuspend={this.onMediaEvent}
        // onVolumeChange={this.onMediaEvent}
        // onWaiting={() => this.setStateSafely({ waiting: true })}
      />
    );
  }
}
