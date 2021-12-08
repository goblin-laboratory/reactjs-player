# Usage

Demo page: https://goblin-laboratory.github.io/reactjs-player/

```
npm install reactjs-player --save
# or
yarn add reactjs-player
```

```js
import React, { Component } from 'react';
import ReactjsPlayer from 'reactjs-player';

const App = () => {
  return (
    <ReactjsPlayer
      kernel="hlsjs"
      src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
      type="application/x-mpegURL"
    />
  );
};
```

## 注意事项

- reactjs-player 使用 `position: absolute;` 进行布局，大小和位置由最近的非 `static` 定位祖先元素控制，建议使用的时候将父节点设置 `position` 设置为 `relative` 并设置好大小
- `GrindPlayer` 有个限制，当元素尺寸小于 400x300 时视频无法播放，使用是需要保证播放区域不能小于这个大小

## 常用场景说明

### srswebrtc: 支持 webrtc 的浏览器上播放 SRS RTC 直播流

```jsx
<ReactjsPlayer
  kernel="srswebrtc"
  live={true}
  src="webrtc://d.ossrs.net:443/live/fa287f50"
  type=""
  config={{ protocol: 'https:' }}
/>
```

### hlsjs: 支持 MSE 的浏览器上播放录像

```jsx
<ReactjsPlayer
  kernel="hlsjs"
  live={false}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

### flvjs: 支持 MSE 与 networkStreamIO 的浏览器上播放直播

```jsx
<ReactjsPlayer kernel="flvjs" live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```

### native: 原生支持 hls 的浏览器上播放录像（iOS/Android）

```jsx
<ReactjsPlayer
  kernel="native"
  live={false}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

### native: 原生支持 hls 的浏览器上播放直播（iOS/Android）

```jsx
<ReactjsPlayer
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
