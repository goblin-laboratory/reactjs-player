# API

## ReactPlayer

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

| Value      | Description                                       |
| ---------- | ------------------------------------------------- |
| `'hlsjs'`  | use [hls.js](https://github.com/video-dev/hls.js) |
| `'flvjs'`  | use [flv.js](https://github.com/bilibili/flv.js)  |
| `'native'` | use native video                                  |

**controls**

| Value        | Description           |
| ------------ | --------------------- |
| `true`       | ReactPlayerSkin       |
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

## ReactPlayerContext

订阅 ReactPlayer 的 Context，必须在 ReactPlayer 的子组件中使用

```jsx
import React from 'react';
import ReactPlayer from 'reactjs-player';

const ReactPlayerContext = ReactPlayer.ReactPlayerContext;

const ReactPlayerChild = () => {
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
  } = React.useContext(ReactPlayerContext);

  return <>{loading && <div>loading</div>}</>;
};

const App = () => {
  return (
    <ReactPlayer kernel="hlsjs" src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8">
      <ReactPlayerChild />
    </ReactPlayer>
  );
};
```
