import Hls from 'hls.js';
import type { HlsConfig } from 'hls.js';
import Kernel from './Kernel';

class HlsjsKernel extends Kernel {
  static name = 'hlsjs';

  load(props: KernelProps<HlsConfig>): Promise<Hls | null> {
    this.clean();
    this.props = props;
    const { src, config, videoRef } = this.props || {};
    if (!src || !videoRef?.current) {
      this.props = null;
      return Promise.resolve(null);
    }
    const player = new Hls(Object.assign({}, config, { debug: false }));
    if (!player) {
      return Promise.resolve(null);
    }
    player.attachMedia(videoRef.current);
    this.player = player;
    return new Promise((resolve, reject) => {
      if (this.player !== player) {
        return resolve(null);
      }
      player.once(Hls.Events.MEDIA_ATTACHED, () => {
        if (this.player === player && this.props?.src === src) {
          player.loadSource(src);
          resolve(player);
        }
      });
      player.once(Hls.Events.ERROR, (_, info) => {
        if (this.player === player) {
          reject({ type: info.type, detail: info.details });
        }
      });
    });
  }

  clean() {
    const player = this.player as Hls;
    this.player = null;
    this.props = null;
    if (player) {
      try {
        player.destroy();
      } catch (errMsg) {}
    }
    return Promise.resolve();
  }
}

export default HlsjsKernel;
