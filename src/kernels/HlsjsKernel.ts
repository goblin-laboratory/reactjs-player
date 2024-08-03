import Hls from 'hls.js';
import type { HlsConfig } from 'hls.js';
import Kernel from './Kernel';

class HlsjsKernel extends Kernel<Hls, HlsConfig> {
  static name = 'hlsjs';

  load(props: unknown) {
    this.clean();
    this.props = props as LoadParams<HlsConfig>;
    const { src, config, videoRef } = this.props || {};
    if (!src || !videoRef?.current) {
      this.props = null;
      return Promise.resolve();
    }
    const player = new Hls(Object.assign({}, config, { debug: false }));
    if (!player) {
      return Promise.resolve();
    }
    this.player = player;
    player.attachMedia(videoRef.current);
    return new Promise((resolve, reject) => {
      if (this.player !== player) {
        return resolve(undefined);
      }
      this.player.once(Hls.Events.MEDIA_ATTACHED, () => {
        if (this.player === player && this.props?.src === src) {
          player.loadSource(src);
          resolve(player);
        }
      });
      this.player.once(Hls.Events.ERROR, (_, info) => {
        if (this.player === player) {
          reject({ type: info.type, detail: info.details });
        }
      });
    });
  }

  clean() {
    const player = this.player;
    this.player = null;
    this.props = null;
    if (player) {
      try {
        player.destroy();
      } catch (errMsg) {}
    }
  }
}

export default HlsjsKernel;
