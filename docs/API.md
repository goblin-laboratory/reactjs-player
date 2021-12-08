# API

## ReactjsPlayer

### props

props 参考 video 属性： https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#Attributes

| Prop            | Type     | Default | Description       |
| --------------- | -------- | ------- | ----------------- |
| `kernel`        | `Enum`   |         |                   |
| `live`          | `Bool`   |         |                   |
| `config`        | `Object` | `null`  | kernel config     |
| --              | --       | --      | --                |
| `src`           | `String` | `''`    |                   |
| `type`          | `String` |         |                   |
| `controls`      | `Enum`   | `true`  |                   |
| `muted`         | `Bool`   | `false` |                   |
| `autoPlay`      | `Bool`   | `true`  | Not supported yet |
| --              | --       | --      | --                |
| `className`     | `String` | `''`    |                   |
| `playerProps`   | `Object` | `null`  |                   |
| `videoProps`    | `Object` | `null`  |                   |

**kernel**

| Value          | Description                                       |
| -------------- | ------------------------------------------------- |
| `'srswebrtc'`  | 代码库内置，后续独立成单独的 npm 包                  |
| `'hlsjs'`      | use [hls.js](https://github.com/video-dev/hls.js) |
| `'flvjs'`      | use [flv.js](https://github.com/bilibili/flv.js)  |
| `'native'`     | use native video                                  |

**controls**

| Value        | Description           |
| ------------ | --------------------- |
| `true`       | ReactjsPlayerSkin       |
| `false`      | without controls      |
| `'controls'` | video native controls |

### Callback props

[媒体事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)说明

| Prop                 | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `onKernelError`      | fire when flv.js / hls.js error                      |
| --                   | --                                                   |

## GrindPlayer

| Prop             | Type     | Default                                                   | Description |
| ---------------- | -------- | --------------------------------------------------------- | ----------- |
| `live`           | `Bool`   | `true`                                                    |             |
| `src`            | `String` | `''`                                                      |             |
| `type`           | `String` | `'video/rtmp'`                                            |             |
| `grindPlayerSwf` | `String` | `'https://unpkg.com/reactjs-player/dist/GrindPlayer.swf'` |             |
| `flashlsOSMFSwf` | `String` | `'https://unpkg.com/reactjs-player/dist/flashlsOSMF.swf'` |             |

> 注意：使用 Flash 时需要在根目录存放 crossdomain.xml 文件

## ReactjsPlayerContext

订阅 ReactjsPlayer 的 Context，必须在 ReactjsPlayer 的子组件中使用

```jsx
import React from 'react';
import ReactjsPlayer from 'reactjs-player';

const ReactjsPlayerContext = ReactjsPlayer.ReactjsPlayerContext;

const ReactjsPlayerChild = () => {
  const {
    src,
    loading,
    paused,
    waiting,
    seeking,
    ended,
    duration,
    currentTime,
    buffered,
    muted,
    volume,
    playbackRate,
    fullscreen,

    changeCurrentTime,
    onPauseClick,
    onPlayClick,
    onMutedClick,
    changeVolume,
    onPiPClick,
    requestFullscreen,
    exitFullscreen,
    changePlaybackRate,

    playerMsg,
  } = React.useContext(ReactjsPlayerContext);

  return <>{loading && <div>loading</div>}</>;
};

const App = () => {
  return (
    <ReactjsPlayer kernel="hlsjs" src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8">
      <ReactjsPlayerChild />
    </ReactjsPlayer>
  );
};
```
