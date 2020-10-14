# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.1](https://github.com/goblin-laboratory/reactjs-player/compare/v1.2.0...v1.2.1) (2020-10-14)

**Note:** Version bump only for package reactjs-player





# [1.2.0](https://github.com/goblin-laboratory/reactjs-player/compare/v1.1.3...v1.2.0) (2020-10-14)


### Features

* 支持自动播放 ([4c264da](https://github.com/goblin-laboratory/reactjs-player/commit/4c264dafe41224bad6eb54eadd642c4b7c7c9cc9))





## [1.1.3](https://github.com/goblin-laboratory/reactjs-player/compare/v1.1.2...v1.1.3) (2020-06-10)

**Note:** Version bump only for package reactjs-player





## [1.1.2](https://github.com/goblin-laboratory/reactjs-player/compare/v1.1.1...v1.1.2) (2020-06-10)

**Note:** Version bump only for package reactjs-player





## [1.1.1](https://github.com/goblin-laboratory/reactjs-player/compare/v1.1.0...v1.1.1) (2020-06-10)

**Note:** Version bump only for package reactjs-player





# [1.1.0](https://github.com/goblin-laboratory/reactjs-player/compare/v1.1.0-alpha.1...v1.1.0) (2020-06-09)


### Bug Fixes

* 修复录像播放完成后点击播放按钮式异常问题 ([c92b91b](https://github.com/goblin-laboratory/reactjs-player/commit/c92b91b969d8a15ebd4860819c6f8c7960821a6b))
* 降低 GrindPlayer 日志等级 ([70aba4f](https://github.com/goblin-laboratory/reactjs-player/commit/70aba4f1b4dcbe940fd4a14df1e848685cd43d6e))





# [1.1.0-alpha.1](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.4...v1.1.0-alpha.1) (2020-04-29)


### Features

* GrindPlayer 状态处理 ([8629c89](https://github.com/goblin-laboratory/reactjs-player/commit/8629c89c14f18417d7c331d13004a866080631c2))
* 升级依赖 ([dd08aea](https://github.com/goblin-laboratory/reactjs-player/commit/dd08aeaa91c3c979ff3c37939e1745a83d2a6a57))



# [1.1.0-alpha.0](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.2...v1.1.0-alpha.0) (2020-01-16)


### Features

* 升级依赖 ([eab8611](https://github.com/goblin-laboratory/reactjs-player/commit/eab861132ef762f2e9e326cabe7a8e8f70446a11))
* 同步 master 修改 ([3460a2f](https://github.com/goblin-laboratory/reactjs-player/commit/3460a2f9df46741e32c3e4fb17169a1d2db20065))





# [1.1.0-alpha.0](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.2...v1.1.0-alpha.0) (2020-01-16)


### Features

* 升级依赖 ([eab8611](https://github.com/goblin-laboratory/reactjs-player/commit/eab8611))
* 同步 master 修改 ([3460a2f](https://github.com/goblin-laboratory/reactjs-player/commit/3460a2f))
## [1.0.4](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.3...v1.0.4) (2020-02-17)

**Note:** Version bump only for package reactjs-player





## [1.0.3](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.2...v1.0.3) (2020-01-19)


### Bug Fixes

* 解决直播时一直显示 loading 问题 ([e22805a](https://github.com/goblin-laboratory/reactjs-player/commit/e22805a))





## [1.0.2](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.2-alpha.0...v1.0.2) (2020-01-15)

**Note:** Version bump only for package reactjs-player





## [1.0.1](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.0...v1.0.1) (2020-01-09)


### Bug Fixes

* 增加 prevented 状态 ([15e6456](https://github.com/goblin-laboratory/reactjs-player/commit/15e6456))





# [1.0.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.9.1...v1.0.0) (2020-01-06)


### Features

* 使用 x5 最新的同层播放 h5-page 代替 x5-playsinline ([2359029](https://github.com/goblin-laboratory/reactjs-player/commit/2359029))
* 增大进度条拖动操作区域 ([2047017](https://github.com/goblin-laboratory/reactjs-player/commit/2047017))


### BREAKING CHANGES

* 安卓上微信浏览器使用页面内播放代替同层播放
- 删除 x5playsinline 属性
- 删除 x5videofullscreen 状态





## [0.9.1](https://github.com/goblin-laboratory/reactjs-player/compare/v0.9.0...v0.9.1) (2019-10-24)


### Bug Fixes

* 修复 ReactjsPlayer 无法正常切换 kennel 问题 ([2eeca58](https://github.com/goblin-laboratory/reactjs-player/commit/2eeca58))
* 修复时间显示为 5:59:60 的问题 ([772c898](https://github.com/goblin-laboratory/reactjs-player/commit/772c898))





# [0.9.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.8.3...v0.9.0) (2019-10-12)


### Features

* 只有 src 变化时才重新播放，避免 useEffect 需要比较太多数据，解决 flv 与 hls 相互切换时播放异常 ([e291ea2](https://github.com/goblin-laboratory/reactjs-player/commit/e291ea2))





## [0.8.3](https://github.com/goblin-laboratory/reactjs-player/compare/v0.8.2...v0.8.3) (2019-09-06)


### Bug Fixes

* 修复 control bar 自动隐藏相关问题 ([737fcf2](https://github.com/goblin-laboratory/reactjs-player/commit/737fcf2))
* 手机端 control bar 显示时进度条 handel 强制显示 ([c6b07a6](https://github.com/goblin-laboratory/reactjs-player/commit/c6b07a6))





## [0.8.2](https://github.com/goblin-laboratory/reactjs-player/compare/v0.8.1...v0.8.2) (2019-09-05)


### Bug Fixes

* 修复直播时可以选择倍速播放问题 ([84e127a](https://github.com/goblin-laboratory/reactjs-player/commit/84e127a))
* 修复直播时鼠标 tooltip 会显示问题 ([1e850b0](https://github.com/goblin-laboratory/reactjs-player/commit/1e850b0))
* 解决拖动时移出进度条鼠标 tooltip 不显示问题 ([3b88d57](https://github.com/goblin-laboratory/reactjs-player/commit/3b88d57))





## [0.8.1](https://github.com/goblin-laboratory/reactjs-player/compare/v0.8.0...v0.8.1) (2019-08-27)


### Bug Fixes

* eslint warnings ([bc9266d](https://github.com/goblin-laboratory/reactjs-player/commit/bc9266d))
* 删除 hls.js/flv.js 依赖，按需加载 ([c8beeb1](https://github.com/goblin-laboratory/reactjs-player/commit/c8beeb1))
* 调整目录结构，支持自定义 hooks，解决拖动进度时控制栏隐藏问题 ([27f257f](https://github.com/goblin-laboratory/reactjs-player/commit/27f257f))





# [0.8.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.3...v0.8.0) (2019-08-26)


### Features

* react-player => reactjs-player ([7be8bdb](https://github.com/goblin-laboratory/reactjs-player/commit/7be8bdb))





# [0.7.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.3...v0.7.0) (2019-08-26)


### Features

* react-player => reactjs-player ([7be8bdb](https://github.com/goblin-laboratory/reactjs-player/commit/7be8bdb))





## [0.6.3](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.1-alpha.3...v0.6.3) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.3](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.1-alpha.2...v0.6.1-alpha.3) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.2](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.1-alpha.1...v0.6.1-alpha.2) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.1](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.2-alpha.0...v0.6.1-alpha.1) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.5.5...v0.6.1-alpha.0) (2019-08-26)


### Features

* 将 react custom hooks 拆分出来，使用 lerna 管理仓库 ([89f3adf](https://github.com/goblin-laboratory/reactjs-player/commit/89f3adf))
