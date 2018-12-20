import getScript from './getScript';

const detect = async ({
  desktop = true,
  protocols = ['flv', 'hls', 'rtmp'],
  hlsjsPath = 'https://cdn.jsdelivr.net/npm/hls.js@latest',
  flvjsPath = 'https://cdn.jsdelivr.net/npm/flv.js@latest',
}) => {
  if (!desktop) {
    if (protocols.find(it => 'hls' === it)) {
      return ['hls'];
    }
    return [];
  }
  const supported = [];
  const promise = [];
  const needFlv = -1 !== protocols.find(it => 'flv' === it);
  const needHls = -1 !== protocols.find(it => 'hls' === it);
  if (needFlv) {
    if (!global.flvjs) {
      promise.push(getScript(flvjsPath));
    }
  }
  if (needHls) {
    if (!global.Hls) {
      promise.push(getScript(hlsjsPath));
    }
  }
  if (0 !== promise.length) {
    await Promise.all(promise);
  }
  if (needFlv && global.flvjs && global.flvjs.isSupported() && global.flvjs.getFeatureList().networkStreamIO) {
    supported.push('flv');
  }
  if (needHls && global.Hls && global.Hls.isSupported()) {
    supported.push('hls');
  }

  if (protocols.find(it => 'rtmp' === it)) {
    supported.push('rtmp');
  }
  return supported;
};

export default detect;
