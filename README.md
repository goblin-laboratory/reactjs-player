![ReactPlayer](./logo128x128.png)

# ReactPlayer

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

基于 react hooks 的 video 播放组件，结构简单，代码简洁，扩展方便。

## 特点

`ReactPlayer` 遵循 `少即是多（Less is more）` 的设计原则，具有以下特点：

- 结构简单：使用 `react hooks` 做状态管理，将不同的状态拆分到不同的 `react custom hooks` 中，`ReactPlayer` 中进行组合
- 扩展方便：扩展时实现对应的 `react custom hooks` 并在 `ReactPlayer` 中根据条件进行加载
- 代码简洁：只做播放器内部的状态管理和控制栏显示与控制，Gzip 后只有 8KB
- 理解容易： `ReactPlayer` 事件基于 `vidoe` [媒体事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events) 进行扩展，减小理解成本
- 使用相对复杂：不同于市面上其他的 h5 播放器，`ReactPlayer` 将控制权交给使用者，无法做到一行代码播放所有兼容的格式

## Getting started

```
git clone https://github.com/goblin-laboratory/react-player.git
cd react-player
yarn install
yarn start
```

## Usage

Demo page: [Demo](https://goblin-laboratory.github.io/react-player/)

```
npm install reactjs-player --save
# or
yarn add reactjs-player
```

```js
import React, { Component } from 'react';
import ReactPlayer from 'reactjs-player';

const App = () => {
  return <ReactPlayer kernel="hlsjs" src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8" />;
};
```

### 常用场景说明

- hlsjs: 支持 MSE 的浏览器上播放录像

```jsx
<ReactPlayer
  kernel="hlsjs"
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

- flvjs: 支持 MSE 与 networkStreamIO 的浏览器上播放直播

```jsx
<ReactPlayer kernel="flvjs" live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```

- native: 原生支持 hls 的浏览器上播放录像（iOS/Android）

```jsx
<ReactPlayer
  kernel="native"
  live={false}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

- native: 原生支持 hls 的浏览器上播放直播（iOS/Android）

```jsx
<ReactPlayer
  kernel="native"
  live={true}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

- GrindPlayer: PC 端低版本浏览器播放录像

```jsx
<GrindPlayer live={false} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/rtmp" />
```

- GrindPlayer: PC 端低版本浏览器播放直播

```jsx
<GrindPlayer live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```

## Props

| Prop          | Type                           | Optional | Default | Description            |
| ------------- | ------------------------------ | -------- | ------- | ---------------------- |
| `kernel`      | `['hlsjs', 'flvjs', 'native']` | `false`  |         |                        |
| `live`        | `Bool`                         | `false`  |         |                        |
| `config`      | `Object`                       | `true`   | `null`  | kernel config          |
| --            | --                             | --       | --      | --                     |
| `src`         | `String`                       | `true`   | `''`    |                        |
| `type`        | `String`                       | `false`  | `--`    |                        |
| `controls`    | `[true', false', 'controls']`  | `false`  | `true`  |                        |
| `muted`       | `Bool`                         | `true`   | `false` | 静音                   |
| `volume`      | `Number`                       | `true`   | `1.0`   | 默认音量               |
| `autoPlay`    | `Bool`                         | `true`   | `true`  | 暂未实现               |
| `currentTime` | `Number`                       | `true`   | `0`     |                        |
| `loop`        | `Bool`                         | `true`   | `false` |                        |
| `playsInline` | `Bool`                         | `true`   | `true`  | 页面内播放，iOS 端支持 |

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

### Config props

| Prop          | Type     | Optional | Default | Description |
| ------------- | -------- | -------- | ------- | ----------- |
| `currentTime` | `Number` | `true`   | `0`     |             |
| `volume`      | `Number` | `true`   | `1.0`   |             |

### Callback props

[媒体事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)说明

| Prop               | Description |
| ------------------ | ----------- |
| `onCanPlay`        |             |
| `onDurationChange` |             |
| `onTimeUpdate`     |             |
| `onPause`          |             |
| `onPlay`           |             |
| `onPlaying`        |             |
| `onEnded`          |             |
| `onSeeked`         |             |
| `onSeeking`        |             |
| `onCanPlayThrough` |             |
| `onEmptied`        |             |
| `onEncrypted`      |             |
| `onError`          |             |
| `onLoadedData`     |             |
| `onLoadedMetadata` |             |
| `onLoadStart`      |             |
| `onProgress`       |             |
| `onRateChange`     |             |
| `onStalled`        |             |
| `onSuspend`        |             |
| `onVolumeChange`   |             |
| `onWaiting`        |             |
| `onAbort`          |             |

### 同层播放 Props

| Prop                        | Type       | Optional | Default        | Description |
| --------------------------- | ---------- | -------- | -------------- | ----------- |
| `x5playsinline`             | `Bool`     | `true`   | `false`        |             |
| `objectPosition`            | `String`   | `true`   | `'center top'` |             |
| `onX5VideoFullscreenChange` | `Function` | `true`   | `noop`         |             |

## Methods

暂未支持

| Method           | Return Type | Description |
| ---------------- | ----------- | ----------- |
| `getCurrentTime` | `Number`    |             |
| `setCurrentTime` | `Number`    |             |
| `getBuffered`    | `Object`    |             |

### GrindPlayer

| Prop             | Type     | Optional | Default                                                   | Description |
| ---------------- | -------- | -------- | --------------------------------------------------------- | ----------- |
| `live`           | `Bool`   | `true`   | `true`                                                    |             |
| `src`            | `String` | `true`   | `''`                                                      |             |
| `type`           | `String` | `true`   | `'video/rtmp'`                                            |             |
| `grindPlayerSwf` | `String` | `true`   | `'https://unpkg.com/reactjs-player/dist/GrindPlayer.swf'` |             |
| `flashlsOSMFSwf` | `String` | `true`   | `'https://unpkg.com/reactjs-player/dist/flashlsOSMF.swf'` |             |

### ReactPlayerSkin

待补充

### ReactPlayerContext

待补充

## Supported media

- HLS
- FLV
- RTMP

## 微信同层播放

待补充

## Contributing

非常欢迎你的贡献，你可以通过以下方式和我们一起共建 😃：

- 通过 Issue 报告 bug 或进行咨询。
- 提交 Pull Request 。

## Licensing

ReactPlayer is [MIT licensed](./LICENSE).
