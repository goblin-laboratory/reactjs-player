# ReactHlsjsPlayer

## Props

### 属性

| 属性         | 类型   | 默认值                  | 说明           |
| ------------ | ------ | ----------------------- | -------------- |
| live         | bool   | false                   | 是否是直播     |
| src          | string | ''                      |
| type         | string | 'application/x-mpegURL' |
| config       | object | 见表格下方说明          | hls.js 参数    |
| controls     | bool   | true                    | 是否显示控制栏 |
| muted        | bool   | false                   | 是否静音       |
| playbackRate | number | 1                       | 播放倍速       |
| autoPlay     | bool   | true                    | 自动播放       |
| loop         | bool   | false                   | 自动循环       |

config 默认值

```js
{ debug: false, enableWorker: false }
```

### 方法

- play
- pause
- getCurrentTime
- setCurrentTime
- getBuffered
- mute

### [事件列表](https://react.docschina.org/docs/events.html#media-events)

[事件说明](https://github.com/gnipbao/iblog/issues/27)

- onCanPlay
- onDurationChange
- onTimeUpdate
- onPause
- onPlay
- onPlaying
- onEnded
- onSeeked
- onSeeking
- onCanPlayThrough
- onEmptied
- onEncrypted
- onError
- onLoadedData
- onLoadedMetadata
- onLoadStart
- onProgress
- onRateChange
- onStalled
- onSuspend
- onVolumeChange
- onWaiting
- onAbort
