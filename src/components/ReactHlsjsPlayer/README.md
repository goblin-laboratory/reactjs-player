# ReactHlsjsPlayer

## Props

| 属性             | 类型   | 默认值                         | 说明                                |
| ---------------- | ------ | ------------------------------ | ----------------------------------- |
| live             | bool   | false                          | 是否是直播，影响进度条显示          |
| src              | string | ''                             |
| type             | string | ''                             |
| options          | object | { debug, enableWorker: false } | hls.js 参数，参数变化后会重新初始化 |
| controls         | bool   | true                           | 是否显示控制栏                      |
| muted            | bool   | false                          | 是否静音                            |
| autoPlay         | bool   | true                           | 是否静音                            |
| loop             | bool   | false                          | 是否自动循环                        |
| currentTime      | number | 0                              | 设置当前播放位置                    |
| onCanPlay        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onDurationChange | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onTimeUpdate     | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onPause          | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onPlay           | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onPlaying        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onEnded          | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onSeeked         | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onSeeking        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onCanPlayThrough | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onEmptied        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onEncrypted      | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onError          | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onLoadedData     | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onLoadedMetadata | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onLoadStart      | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onProgress       | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onRateChange     | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onStalled        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onSuspend        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onVolumeChange   | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onWaiting        | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
| onAbort          | func   | noop                           | [说明](https://github.com/gnipbao/iblog/issues/27)
