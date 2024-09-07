import flvjs from 'flv.js';
import Kernel from './Kernel';

class FlvjsKernel extends Kernel {
  static name = 'flvjs';

  load(props: KernelProps<flvjs.Config>): Promise<flvjs.Player | null> {
    this.clean();
    this.props = props;
    const { src, config, videoRef } = this.props || {};
    if (!src || !videoRef?.current) {
      this.props = null;
      return Promise.resolve(null);
    }
    const player = flvjs.createPlayer({ isLive: true, type: 'flv', url: src }, config as flvjs.Config);
    if (!player) {
      return Promise.resolve(null);
    }
    player.attachMediaElement(videoRef.current);
    player.load();
    this.player = player;
    return new Promise((resolve, reject) => {
      if (this.player !== player) {
        return resolve(null);
      }
      player.on(flvjs.Events.LOADING_COMPLETE, () => {
        if (this.player === player) {
          resolve(player);
        }
      });
      player.on(flvjs.Events.ERROR, (type, detail) => {
        if (this.player === player) {
          reject({ type, detail });
        }
      });
    });
  }

  clean() {
    const player = this.player as flvjs.Player;
    this.player = null;
    this.props = null;
    if (player) {
      try {
        player.pause();
      } catch (errMsg) {}
      try {
        player.unload();
      } catch (errMsg) {}
      try {
        player.detachMediaElement();
      } catch (errMsg) {}
      try {
        player.destroy();
      } catch (errMsg) {}
    }
    return Promise.resolve();
  }
}

export default FlvjsKernel;
