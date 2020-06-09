import { EventEmitter } from 'fbemitter';

let emitter = null;
let index = 0;

class GrindPlayer {
  /**
   * 创建 GrindPlayer 实例
   */
  constructor(id) {
    this.id = id;
    this.el = null;
    this.emitter = new EventEmitter();
    this.tokenList = [];
    this.eventMap = [];

    this.addListener();
  }

  addListener() {
    if (!emitter) {
      emitter = new EventEmitter();
    }

    this.tokenList = [
      emitter.addListener(`${this.id}.onJavaScriptBridgeCreated`, () => {
        this.el = document.getElementById(this.id);
        // this.el.addEventListener('mediaError', () => );
      }),
      emitter.addListener(`${this.id}.mediaSize`, data => {
        if (0 === data.videoHeight && 0 === data.videoWidth) {
          this.emitter.emit('canplay');
        } else {
          this.emitter.emit('canplaythrough');
        }
      }),
      emitter.addListener(`${this.id}.paused`, () => this.emitter.emit('pause')),
      emitter.addListener(`${this.id}.playing`, () => this.emitter.emit('playing')),
      emitter.addListener(`${this.id}.seeking`, () => this.emitter.emit('seeking')),
      emitter.addListener(`${this.id}.seeked`, () => this.emitter.emit('seeked')),
      emitter.addListener(`${this.id}.complete`, () => this.emitter.emit('ended')),
      emitter.addListener(`${this.id}.buffering`, () => this.emitter.emit('waiting')),

      emitter.addListener(`${this.id}.durationChange`, e => this.emitter.emit('durationchange', e)),
      emitter.addListener(`${this.id}.timeChange`, e => this.emitter.emit('timeupdate', e)),
      emitter.addListener(`${this.id}.progress`, e => this.emitter.emit('progress', e)),

      emitter.addListener(`${this.id}.volumeChange`, e => this.emitter.emit('volumechange', e)),
    ];
  }

  invoker(methodName, ...args) {
    if (!this.el) {
      return;
    }
    this.el[methodName](...args);
  }

  addEventListener(event, fn) {
    if (!this.eventMap) {
      return;
    }
    const token = this.emitter.addListener(event, fn);
    this.eventMap.push({ token, event, fn });
  }

  removeEventListener(event, fn) {
    if (!this.eventMap) {
      return;
    }
    this.eventMap = this.eventMap.filter(it => {
      if (it.event !== event) {
        return true;
      }
      if (!fn && it.fn !== fn) {
        return true;
      }
      it.token.remove();
      return false;
    });
  }

  destroy() {
    if (this.eventMap) {
      this.eventMap.map(it => it.token.remove());
      delete this.eventMap;
    }

    if (this.tokenList) {
      this.tokenList.map(it => it.remove());
      delete this.tokenList;
    }

    if (this.emitter) {
      this.emitter.removeAllListeners();
    }
    delete this.emitter;

    delete this.id;
    delete this.el;
  }
}

const onJSBridge = (playerId, event, data) => {
  if (!emitter) {
    emitter = new EventEmitter();
  }
  console.log(`${event}: ${JSON.stringify(data)}`);
  emitter.emit(`${playerId}.${event}`, data);
};

export default {
  getPlayerId: () => `grindPlayer${index++}`,

  getGrindPlayer: (id, javascriptCallbackFunction) => {
    if (!global[javascriptCallbackFunction]) {
      global[javascriptCallbackFunction] = onJSBridge;
    }
    return new GrindPlayer(id);
  },
};
