![ReactjsPlayer](./docs/logo128x128.png)

# ReactjsPlayer

[![npm](https://img.shields.io/npm/v/reactjs-player.svg?color=blue&style=flat-square)](https://www.npmjs.com/package/reactjs-player)
[![reactjs-player](https://img.shields.io/bundlephobia/minzip/reactjs-player.svg?style=flat-square)](https://www.npmjs.com/package/reactjs-player)
[![Travis (.org)](https://img.shields.io/travis/goblin-laboratory/reactjs-player.svg?style=flat-square)](https://travis-ci.org/goblin-laboratory/reactjs-player)
[![Coveralls github](https://img.shields.io/coveralls/github/goblin-laboratory/reactjs-player.svg?style=flat-square)](https://coveralls.io/github/goblin-laboratory/reactjs-player)

基于 react hooks 的 video 播放组件，结构简单，代码简洁，扩展方便。

## 特点

`ReactjsPlayer` 遵循 `少即是多（Less is more）` 的设计原则，具有以下特点：

- 结构简单：使用 `react hooks` 做状态管理，将不同的状态拆分到不同的 `react custom hooks` 中，`ReactjsPlayer` 中进行组合

- 扩展方便：扩展时实现对应的 `react custom hooks` 并在 `ReactjsPlayer` 中根据条件进行加载

- 代码简洁：只做播放器内部的状态管理和控制栏显示与控制

- 理解容易： `ReactjsPlayer` 事件基于 `vidoe` [媒体事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events) 进行扩展，减小理解成本

- 接口统一：`ReactjsPlayer` 与 `GrindPlayer` 封装了统一的状态和方法，并通过 `ReactPlayerContext` 导出

- 使用相对复杂：不同于其他的 h5 播放器，`ReactjsPlayer` 将控制权交给使用者，无法做到一行代码播放所有兼容的格式

## Getting started

```
git clone https://github.com/goblin-laboratory/reactjs-player.git
cd reactjs-player
pnpm install
```

```
cd packages/reactjs-player/
pnpm start
```

```
cd packages/reactjs-player-demo/
pnpm start
```

### 正式版本
```
pnpm standard-version
```

### 测试版本

```
npm login
npm publish --tag alpha
```


## Usage

Demo page: https://goblin-laboratory.github.io/reactjs-player/

```
npm install reactjs-player --save
# or
pnpm add reactjs-player
```

```js
import React, { Component } from 'react';
import ReactjsPlayer from 'reactjs-player';

const App = () => {
  return <ReactjsPlayer kernel="hlsjs" src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8" />;
};
```

常用场景见说明文档：[Usage.md](https://github.com/goblin-laboratory/reactjs-player/blob/master/docs/Usage.md)

## TODO
3.x 版本计划
1. 使用 TypeScript 重构
2. 使用 tsdx 负责打包
3. Jest 自动化测试
4. storybook

## API

见 API 说明文档：[API.md](https://github.com/goblin-laboratory/reactjs-player/blob/master/docs/API.md)

## 注意事项

1. reactjs-player `position` 为 `absolute` ， 大小和位置依赖相对于 static 定位以外的第一个父元素，建议将父节点 `position` 设置为 `relative`，通过控制父节点的大小和位置来控制 reactjs-player 的布局结果，可以参考 demo 中的实现

2. GrindPlayer 必须要大于 400x300 才能正常播放，请保证播放区域不小于 400x300，否则画面会出现显示不全的情况


## Supported media

- HLS
- FLV
- RTMP

<!-- ## 微信同层播放

待补充 -->

## Contributing

非常欢迎你的贡献，你可以通过以下方式和我们一起共建 😃：

- 通过 Issue 报告 bug 或进行咨询。
- 提交 Pull Request 。

## Licensing

ReactjsPlayer is [MIT licensed](./docs/LICENSE).
