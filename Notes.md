# Notes

## 播放器
1. videojs
2. mediaelement
3. aliplayer
4. chimee: https://github.com/Chimeejs/chimee
5. TCPlayerLite : https://cloud.tencent.com/document/product/454/7503

## 参考资料

1. React: https://react.docschina.org/docs/events.html#media-events
2. 媒体相关事件: https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events
3. 进度条参考: https://juejin.im/post/5cfcd4c5f265da1bb13f246e
4. 防抖: https://github.com/yygmind/blog/issues/39
5. 节流: https://github.com/yygmind/blog/issues/38
6. 微信同层播放: https://x5.tencent.com/tbs/guide/video.html
7. 同层播放: https://zhuanlan.zhihu.com/p/27559167

## Media Event

1. 当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时，会发生 canplaythrough 事件。

2. 当音频/视频处于加载过程中时，会依次发生以下事件：

- loadstart
- durationchange
- loadedmetadata
- loadeddata
- progress
- canplay
- canplaythrough
