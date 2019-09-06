# Usage

Demo page: https://goblin-laboratory.github.io/reactjs-player/

```
npm install reactjs-player --save
# or
yarn add reactjs-player
```

```js
import React, { Component } from 'react';
import ReactPlayer from 'reactjs-player';

const App = () => {
  return (
    <ReactPlayer
      kernel="hlsjs"
      src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
      type="application/x-mpegURL"
    />
  );
};
```

## 常用场景说明

### hlsjs: 支持 MSE 的浏览器上播放录像

```jsx
<ReactPlayer
  kernel="hlsjs"
  live={false}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

### flvjs: 支持 MSE 与 networkStreamIO 的浏览器上播放直播

```jsx
<ReactPlayer kernel="flvjs" live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```

### native: 原生支持 hls 的浏览器上播放录像（iOS/Android）

```jsx
<ReactPlayer
  kernel="native"
  live={false}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

### native: 原生支持 hls 的浏览器上播放直播（iOS/Android）

```jsx
<ReactPlayer
  kernel="native"
  live={true}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

### GrindPlayer: PC 端低版本浏览器播放录像

```jsx
<GrindPlayer live={false} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/rtmp" />
```

### GrindPlayer: PC 端低版本浏览器播放直播

```jsx
<GrindPlayer live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```
