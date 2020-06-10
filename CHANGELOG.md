# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.1](https://github.com/goblin-laboratory/react-player/compare/v1.1.0...v1.1.1) (2020-06-10)


### Bug Fixes

* 修复 onPlayClick 触发时控制台报错问题 ([6b50627](https://github.com/goblin-laboratory/react-player/commit/6b5062770df9cd9c07aba0061c95d178105094ba))





# [1.1.0](https://github.com/goblin-laboratory/react-player/compare/v1.1.0-alpha.1...v1.1.0) (2020-06-09)


### Bug Fixes

* 修复异常更新 currentTime 问题 ([1a5eebf](https://github.com/goblin-laboratory/react-player/commit/1a5eebf512ced7cd0591da2ae3ec9e379abd4ffc))
* 修复录像播放完成后点击播放按钮式异常问题 ([c92b91b](https://github.com/goblin-laboratory/react-player/commit/c92b91b969d8a15ebd4860819c6f8c7960821a6b))
* 降低 GrindPlayer 日志等级 ([70aba4f](https://github.com/goblin-laboratory/react-player/commit/70aba4f1b4dcbe940fd4a14df1e848685cd43d6e))





# [1.1.0-alpha.1](https://github.com/goblin-laboratory/react-player/compare/v1.0.4...v1.1.0-alpha.1) (2020-04-29)


### Bug Fixes

* lint ([438ff75](https://github.com/goblin-laboratory/react-player/commit/438ff752e60669fdfb49b95e41776dd227d8ef28))


### Features

* GrindPlayer 状态处理 ([8629c89](https://github.com/goblin-laboratory/react-player/commit/8629c89c14f18417d7c331d13004a866080631c2))
* 升级依赖 ([dd08aea](https://github.com/goblin-laboratory/react-player/commit/dd08aeaa91c3c979ff3c37939e1745a83d2a6a57))



# [1.1.0-alpha.0](https://github.com/goblin-laboratory/react-player/compare/v1.0.2...v1.1.0-alpha.0) (2020-01-16)


### Features

* 升级依赖 ([eab8611](https://github.com/goblin-laboratory/react-player/commit/eab861132ef762f2e9e326cabe7a8e8f70446a11))
* 同步 master 修改 ([3460a2f](https://github.com/goblin-laboratory/react-player/commit/3460a2f9df46741e32c3e4fb17169a1d2db20065))





# [1.1.0-alpha.0](https://github.com/goblin-laboratory/react-player/compare/v1.0.2...v1.1.0-alpha.0) (2020-01-16)


### Features

* 升级依赖 ([eab8611](https://github.com/goblin-laboratory/react-player/commit/eab8611))
* 同步 master 修改 ([3460a2f](https://github.com/goblin-laboratory/react-player/commit/3460a2f))
## [1.0.4](https://github.com/goblin-laboratory/reactjs-player/compare/v1.0.3...v1.0.4) (2020-02-17)


### Bug Fixes

* 修复 src 被清除问题 ([2347688](https://github.com/goblin-laboratory/reactjs-player/commit/2347688))





## [1.0.3](https://github.com/goblin-laboratory/react-player/compare/v1.0.2...v1.0.3) (2020-01-19)


### Bug Fixes

* 暂时删除未通过的单元测试测试项 ([cb45ef8](https://github.com/goblin-laboratory/react-player/commit/cb45ef8))
* 解决直播时一直显示 loading 问题 ([e22805a](https://github.com/goblin-laboratory/react-player/commit/e22805a))





## [1.0.2](https://github.com/goblin-laboratory/react-player/compare/v1.0.2-alpha.0...v1.0.2) (2020-01-15)

**Note:** Version bump only for package reactjs-player





## [1.0.1](https://github.com/goblin-laboratory/react-player/compare/v1.0.0...v1.0.1) (2020-01-09)


### Bug Fixes

* 增加 prevented 状态 ([8640aba](https://github.com/goblin-laboratory/react-player/commit/8640aba))
* 增加 prevented 状态 ([15e6456](https://github.com/goblin-laboratory/react-player/commit/15e6456))
* 解决 publish faild 问题 ([c25a1a9](https://github.com/goblin-laboratory/react-player/commit/c25a1a9))





# [1.0.0](https://github.com/goblin-laboratory/react-player/compare/v0.9.1...v1.0.0) (2020-01-06)


### Features

* demo 增加 vconsole，方便手机上查看 log ([a3eca25](https://github.com/goblin-laboratory/react-player/commit/a3eca25))
* demo 增加 vconsole，方便手机上查看 log ([cb744aa](https://github.com/goblin-laboratory/react-player/commit/cb744aa))
* 使用 x5 最新的同层播放 h5-page 代替 x5-playsinline ([2359029](https://github.com/goblin-laboratory/react-player/commit/2359029))
* 增大进度条拖动操作区域 ([2047017](https://github.com/goblin-laboratory/react-player/commit/2047017))


### BREAKING CHANGES

* 安卓上微信浏览器使用页面内播放代替同层播放
- 删除 x5playsinline 属性
- 删除 x5videofullscreen 状态





## [0.9.1](https://github.com/goblin-laboratory/react-player/compare/v0.9.0...v0.9.1) (2019-10-24)


### Bug Fixes

* 修复 ReactjsPlayer 无法正常切换 kennel 问题 ([2eeca58](https://github.com/goblin-laboratory/react-player/commit/2eeca58))
* 修复停止播放后仍然存在更新 state 的问题 ([eddb684](https://github.com/goblin-laboratory/react-player/commit/eddb684))
* 修复时间显示为 5:59:60 的问题 ([772c898](https://github.com/goblin-laboratory/react-player/commit/772c898))





# [0.9.0](https://github.com/goblin-laboratory/react-player/compare/v0.8.3...v0.9.0) (2019-10-12)


### Bug Fixes

* 修复 destroyPlayer 时判断条件错误导致 hls 未正常销毁问题 ([7fa4f81](https://github.com/goblin-laboratory/react-player/commit/7fa4f81))


### Features

* 只有 src 变化时才重新播放，避免 useEffect 需要比较太多数据，解决 flv 与 hls 相互切换时播放异常 ([e291ea2](https://github.com/goblin-laboratory/react-player/commit/e291ea2))





## [0.8.3](https://github.com/goblin-laboratory/react-player/compare/v0.8.2...v0.8.3) (2019-09-06)


### Bug Fixes

* duration 增加 Infinity 校验 ([c7ca1b3](https://github.com/goblin-laboratory/react-player/commit/c7ca1b3))
* 修复 control bar 自动隐藏相关问题 ([737fcf2](https://github.com/goblin-laboratory/react-player/commit/737fcf2))
* 手机端 control bar 显示时进度条 handel 强制显示 ([c6b07a6](https://github.com/goblin-laboratory/react-player/commit/c6b07a6))





## [0.8.2](https://github.com/goblin-laboratory/react-player/compare/v0.8.1...v0.8.2) (2019-09-05)


### Bug Fixes

* 修复直播时可以选择倍速播放问题 ([84e127a](https://github.com/goblin-laboratory/react-player/commit/84e127a))
* 修复直播时鼠标 tooltip 会显示问题 ([1e850b0](https://github.com/goblin-laboratory/react-player/commit/1e850b0))
* 校验 duration/currentTime 是否是合法值 ([63d247d](https://github.com/goblin-laboratory/react-player/commit/63d247d))
* 解决拖动时移出进度条鼠标 tooltip 不显示问题 ([3b88d57](https://github.com/goblin-laboratory/react-player/commit/3b88d57))





## [0.8.1](https://github.com/goblin-laboratory/react-player/compare/v0.8.0...v0.8.1) (2019-08-27)


### Bug Fixes

* eslint warnings ([bc9266d](https://github.com/goblin-laboratory/react-player/commit/bc9266d))
* 使用 淘宝源 重新生成 yarn.lock 文件 ([9a8af26](https://github.com/goblin-laboratory/react-player/commit/9a8af26))
* 删除 hls.js/flv.js 依赖，按需加载 ([c8beeb1](https://github.com/goblin-laboratory/react-player/commit/c8beeb1))
* 调整目录结构，支持自定义 hooks，解决拖动进度时控制栏隐藏问题 ([27f257f](https://github.com/goblin-laboratory/react-player/commit/27f257f))





# [0.8.0](https://github.com/goblin-laboratory/react-player/compare/v0.6.3...v0.8.0) (2019-08-26)


### Bug Fixes

* 解决 demo 页面 css/js 文件加载失败问题 ([fec57f0](https://github.com/goblin-laboratory/react-player/commit/fec57f0))


### Features

* react-player => reactjs-player ([7be8bdb](https://github.com/goblin-laboratory/react-player/commit/7be8bdb))





# [0.7.0](https://github.com/goblin-laboratory/react-player/compare/v0.6.3...v0.7.0) (2019-08-26)


### Bug Fixes

* 解决 demo 页面 css/js 文件加载失败问题 ([fec57f0](https://github.com/goblin-laboratory/react-player/commit/fec57f0))


### Features

* react-player => reactjs-player ([7be8bdb](https://github.com/goblin-laboratory/react-player/commit/7be8bdb))





## [0.6.3](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.1-alpha.3...v0.6.3) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.3](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.1-alpha.2...v0.6.1-alpha.3) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.2](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.1-alpha.1...v0.6.1-alpha.2) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.1](https://github.com/goblin-laboratory/reactjs-player/compare/v0.6.2-alpha.0...v0.6.1-alpha.1) (2019-08-26)

**Note:** Version bump only for package reactjs-player





## [0.6.1-alpha.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.5.5...v0.6.1-alpha.0) (2019-08-26)


### Bug Fixes

* 触屏设备 tooltipe 不会自动消失 ([dfb1c63](https://github.com/goblin-laboratory/reactjs-player/commit/dfb1c63))


### Features

* 将 react custom hooks 拆分出来，使用 lerna 管理仓库 ([89f3adf](https://github.com/goblin-laboratory/reactjs-player/commit/89f3adf))
* 触屏设备支持拖动进度条 ([8895741](https://github.com/goblin-laboratory/reactjs-player/commit/8895741))





# [0.6.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.5.5...v0.6.0) (2019-08-21)


### Bug Fixes

* 触屏设备 tooltipe 不会自动消失 ([dfb1c63](https://github.com/goblin-laboratory/reactjs-player/commit/dfb1c63))


### Features

* 触屏设备支持拖动进度条 ([8895741](https://github.com/goblin-laboratory/reactjs-player/commit/8895741))





# [0.6.0](https://github.com/goblin-laboratory/reactjs-player/compare/v0.5.5...v0.6.0) (2019-08-21)


### Bug Fixes

* 触屏设备 tooltipe 不会自动消失 ([dfb1c63](https://github.com/goblin-laboratory/reactjs-player/commit/dfb1c63))


### Features

* 触屏设备支持拖动进度条 ([8895741](https://github.com/goblin-laboratory/reactjs-player/commit/8895741))
