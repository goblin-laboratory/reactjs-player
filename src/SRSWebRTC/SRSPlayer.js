export default class SRSPlayer {
  static isSupported() {
    if (!MediaStream || !RTCPeerConnection || !RTCSessionDescription) {
      return false;
    }
    if (!RTCPeerConnection.prototype.addTransceiver) {
      return false;
    }
    return true;
  }

  static getApiPath(url, config) {
    const matched = url.match(/^webrtc:\/\/([^/:]+)(:([^/:]*))?(\/.*)?$/);
    if (!matched) {
      return '';
    }
    let { protocol, port, pathname } = config;
    if ('undefined' === typeof protocol) {
      protocol = global.location.protocol;
    }
    const hostname = matched[1];
    if ('undefined' === typeof port) {
      port = 'undefined' === typeof matched[3] ? global.location.port : matched[3];
    }
    if ('undefined' === typeof pathname) {
      pathname = '/rtc/v1/play/';
    }
    const host = port ? `${hostname}:${port}` : hostname;
    return `${protocol}//${host}${pathname}`;
  }

  constructor(url, config) {
    // webrtc://192.168.0.225/quick/ClpheNxgRBy_XDhXXDq_CQ?vc=ivWxqY
    this.api = SRSPlayer.getApiPath(url, config);
    if (!this.api) {
      return;
    }
    this.url = url;
    // const matched = url.match(/^webrtc:\/\/([^/]+)(\/.*)?$/);
    // if (!matched) {
    //   return null;
    // }
    // this.url = url;
    // const protocol = 'string' === typeof config.protocol ? config.protocol : global.location.protocol;
    // const port = 'string' === typeof config.port ? config.port : global.location.port;
    // const pathname = 'string' === typeof config.pathname ? config.pathname : '/rtc/v1/play/';
    // this.api = `${protocol}//${matched[1]}${pathname}`;
    this.stream = new MediaStream();
    this.trackList = [];
    // return this;
  }

  subscribe() {
    if (!this.url) {
      return null;
    }
    this.unsubscribe();
    this.createRTCPeerConnection();
    this.connectPeerConnection().catch(() => {
      // TODO: 异常处理
    });
    return this.stream;
  }

  unsubscribe() {
    if (!this.pc) {
      return;
    }
    this.closeRTCPeerConnection();
  }

  destroy() {
    this.unsubscribe();

    delete this.url;
    delete this.api;
    delete this.stream;
    delete this.trackList;
  }

  createRTCPeerConnection() {
    const pc = new RTCPeerConnection({
      iceTransportPolicy: 'all',
      bundlePolicy: 'max-bundle',
      rtcpMuxPolicy: 'require',
      iceCandidatePoolSize: '0',
      sdpSemantics: 'unified-plan',
      tcpCandidatePolicy: 'disable',
      IceTransportsType: 'nohost',
    });
    // const pc = new RTCPeerConnection(null);
    pc.addTransceiver('audio', { direction: 'recvonly' });
    pc.addTransceiver('video', { direction: 'recvonly' });

    // pc.onnegotiationneeded = (event) => console.log(event.type);
    // pc.onicecandidate = (event) => console.log(event.type);
    // pc.onicecandidateerror = (event) => console.log(event.type);
    // pc.onsignalingstatechange = (event) => console.log(event.type);
    // pc.oniceconnectionstatechange = (event) => console.log(event.type);
    // pc.oniceconnectionstatechange = (event) => console.log(event.type);
    // pc.onicegatheringstatechange = (event) => console.log(event.type);

    pc.ontrack = (event) => {
      // console.log(event.type);
      this.stream.addTrack(event.track);
      this.trackList.push(event.track);
    };

    // pc.onconnectionstatechange = (event) => {
    //   console.log(`${event.type}: ${event.target.connectionState}`);
    //   // if ('disconnected' === event.target.connectionState) {
    //   //   onDisconnect();
    //   // }
    // };

    this.pc = pc;
    return this.pc;
  }

  connectPeerConnection() {
    const { pc } = this;
    return pc
      .createOffer()
      .then((offer) => pc.setLocalDescription(offer).then(() => offer))
      .then((offer) => this.getSessionInfo({ sdp: offer.sdp }))
      .then((sdp) => pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp })));
  }

  closeRTCPeerConnection() {
    if (this.trackList) {
      this.trackList.forEach((track) => {
        try {
          this.stream.removeTrack(track);
        } catch (errMsg) {}
        try {
          track.stop();
        } catch (errMsg) {}
      });
      this.trackList = [];
    }

    if (!this.pc) {
      return;
    }
    const { pc } = this;
    delete this.pc;
    pc.ontrack = () => {};
    pc.onconnectionstatechange = () => {};

    try {
      pc.getSenders().forEach((it) => pc.removeTrack(it));
    } catch (errMsg) {}
    try {
      pc.close();
    } catch (errMsg) {}
  }

  getSessionInfo({ sdp }) {
    return this.sendRequest(this.api, {
      method: 'POST',
      body: JSON.stringify({
        api: this.api,
        sdp,
        streamurl: this.url,
        clientip: null,
        tid: Number(parseInt(new Date().getTime() * Math.random() * 100, 10))
          .toString(16)
          .substr(0, 7),
      }),
    }).then((info) => {
      if (!info.sdp) {
        return Promise.reject(info);
      }
      return info.sdp;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  sendRequest(url, opts) {
    return fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      ...opts,
    })
      .then((response) => {
        if (200 <= response.status && 300 > response.status) {
          return response;
        }
        const errMsg = new Error(response.statusText);
        errMsg.response = response;
        return Promise.reject(errMsg);
      })
      .then((response) => response.text())
      .then((text) => {
        try {
          return text ? JSON.parse(text) : {};
        } catch (errMsg) {
          return Promise.reject(errMsg);
        }
      });
  }
}
