import flvjs from 'flv.js';
import Kernel from './Kernel';

class FlvjsKernel extends Kernel<flvjs.Player, flvjs.Config> {
  static name = 'flvjs';

  load(props: unknown) {
    this.clean();
    this.props = props as LoadParams<flvjs.Config>;
    const { src, config, videoRef } = this.props || {};
    if (!src || !videoRef?.current) {
      this.props = null;
      return Promise.resolve();
    }
    const player = flvjs.createPlayer({ isLive: true, type: 'flv', url: src }, config);
    if (!player) {
      return Promise.resolve();
    }
    this.player = player;
    this.player.attachMediaElement(videoRef.current);
    this.player.load();
    return new Promise((resolve, reject) => {
      if (this.player !== player) {
        return resolve(undefined);
      }
      this.player.on(flvjs.Events.LOADING_COMPLETE, () => {
        if (this.player === player) {
          resolve(player);
        }
      });
      this.player.on(flvjs.Events.ERROR, (type, detail) => {
        if (this.player === player) {
          reject({ type, detail });
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
  }
}

export default FlvjsKernel;
