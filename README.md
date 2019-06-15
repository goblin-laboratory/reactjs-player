![ReactPlayer](./logo128x128.png)

# ReactPlayer

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

基于 react hooks 的 video 播放组件，代码简洁，扩展简单。

## Getting started

```
git clone https://github.com/goblin-laboratory/react-player.git
cd react-player
yarn install
yarn start
```

## Usage

```
npm install reactjs-player --save
# or
yarn add reactjs-player
```

```js
import React, { Component } from 'react';
import ReactPlayer from 'reactjs-player';

const App = () => {
  return <ReactPlayer src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8" render="hlsjs" />;
};
```

Demo page: [Demo](https://goblin-laboratory.github.io/react-player/)

## Props

待补充

### Callback props

待补充

### Config prop

待补充

## Methods

暂未实现，文案待补充

## Supported media

待补充

## Contributing

非常欢迎你的贡献，你可以通过以下方式和我们一起共建 😃：

- 通过 Issue 报告 bug 或进行咨询。
- 提交 Pull Request 。

## Licensing

ReactPlayer is [MIT licensed](./LICENSE).
