import React from 'react';
import UAParser from 'ua-parser-js';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import { AliRTS } from 'aliyun-rts-sdk';

import { Form, Select, Input, Button, Tabs, Descriptions, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactPlayer from 'reactjs-player';
import grindPlayerSwf from 'reactjs-player/dist/GrindPlayer.swf';
import flashlsOSMFSwf from 'reactjs-player/dist/flashlsOSMF.swf';
import blank16x9 from './blank16x9.png';
import './App.css';

global.Hls = Hls;
global.flvjs = flvjs;
global.AliRTS = AliRTS;
const GrindPlayer = ReactPlayer.GrindPlayer;

const delay = timeout =>
  new Promise(resolve => {
    global.setTimeout(resolve, timeout);
  });

const getSupportedList = ua => {
  return [
    {
      key: 'srswebrtc',
      kernel: 'srswebrtc',
      live: true,
      src: 'webrtc://219.138.162.218/quick/r6uh_z7RSY2ovBplSgZjEw',
      type: '',
    },
    {
      key: 'alirts',
      kernel: 'alirts',
      live: true,
      src: 'rtmp://livetv.dhtv.cn:1935/live/news',
      type: '',
    },
    {
      key: 'flvjs',
      kernel: 'flvjs',
      live: true,
      src: 'http://192.168.0.221/flv_srs/quick/OAyEgozBSTqNC4Ou8SZk_A.flv',
      type: 'video/x-flv',
      config: {
        isLive: true,
        enableStashBuffer: false,
        autoCleanupSourceBuffer: true,
        stashInitialSize: 16 * 1024,
        fixAudioTimestampGap: false,
      },
    },
    {
      key: 'hlsjs',
      kernel: 'hlsjs',
      live: true,
      src: 'http://192.168.0.222/hls_srs/quick/1VU0lHXqSva4TFvmJyqVqg.m3u8',
      type: 'application/x-mpegURL',
    },
    {
      key: 'hlsjs-playback',
      kernel: 'hlsjs',
      live: false,
      src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      type: 'application/x-mpegURL',
    },
    {
      key: 'native-playback',
      kernel: 'native',
      live: false,
      src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      type: 'application/x-mpegURL',
    },
    // { key: 'flash', kernel: 'flash', live: true, src: 'rtmp://livetv.dhtv.cn:1935/live/news', type: 'video/rtmp' },
    // {
    //   key: 'flash-playback',
    //   kernel: 'flash',
    //   live: false,
    //   src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    //   type: 'application/x-mpegURL',
    // },
  ];
};

const App = React.memo(({ form }) => {
  const [list, setList] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [src, setSrc] = React.useState('');
  const [videoProps, setVideoProps] = React.useState(null);
  const ref = React.useRef(list);

  const onChange = React.useCallback(
    v => {
      const item = list.find(it => it.key === v);
      form.setFieldsValue({ src: item.src });
    },
    [form, list],
  );

  const onSubmit = React.useCallback(async values => {
    setSrc('');
    await delay(50);
    const item = ref.current.find(it => it.key === values.type);
    setInfo(item);
    setSrc(values.src);
  }, []);

  const onVideoEvent = React.useCallback(e => {
    const log = console.log;
    log(`e.type: ${e.type}`);
    // if ('durationchange' === e.type) {
    //   log(`durationchange: ${e.target.duration}`);
    // }
  }, []);

  React.useEffect(() => {
    ref.current = list;
  }, [list]);

  React.useEffect(() => {
    const ua = UAParser(global.navigator.userAgent);
    if (ua.device.type) {
      setVideoProps({
        playsInline: true,
        'webkit-playsinline': 'true',
        'x5-video-player-type': 'h5-page',
        'x5-video-orientation': 'landscape|portrait',
      });
    }
    const supportedList = getSupportedList(ua);
    setList(supportedList);
    setInfo(supportedList[0]);
    onSubmit({ type: supportedList[0].key, src: supportedList[0].src });
  }, [onSubmit]);

  if (!list || 0 === list.length || !info) {
    return null;
  }

  return (
    <div className="container">
      <header className="header">
        <Form
          className="form"
          layout="inline"
          onSubmit={e => {
            e.preventDefault();
            form.validateFieldsAndScroll((errors, values) => {
              if (errors) {
                return;
              }
              onSubmit(values);
            });
          }}
        >
          <Form.Item className="type">
            {form.getFieldDecorator('type', {
              initialValue: info.key,
            })(
              <Select onChange={onChange}>
                {list.map(it => (
                  <Select.Option key={it.key} value={it.key}>
                    {it.key}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item className="src">
            {form.getFieldDecorator('src', {
              initialValue: info.src,
            })(<Input />)}
          </Form.Item>
          <Form.Item className="submit">
            <Button type="primary" htmlType="submit">
              播放
            </Button>
          </Form.Item>
        </Form>
      </header>
      <main className="main">
        <img className="blankImg" src={blank16x9} alt="" />
        {'flash' !== info.kernel && (
          <ReactPlayer
            live={info.live}
            kernel={info.kernel}
            type={info.type}
            config={info.config || {}}
            src={src}
            videoProps={{
              ...videoProps,
              onCanPlay: onVideoEvent,
              onDurationChange: onVideoEvent,
              onPause: onVideoEvent,
              onPlay: onVideoEvent,
              onPlaying: onVideoEvent,
              onEnded: onVideoEvent,
              onSeeked: onVideoEvent,
              onSeeking: onVideoEvent,
              onCanPlayThrough: onVideoEvent,
              onEmptied: onVideoEvent,
              onEncrypted: onVideoEvent,
              onError: onVideoEvent,
              onLoadedData: onVideoEvent,
              onLoadedMetadata: onVideoEvent,
              onLoadStart: onVideoEvent,
              onRateChange: onVideoEvent,
              onStalled: onVideoEvent,
              onSuspend: onVideoEvent,
              onVolumeChange: onVideoEvent,
              onWaiting: onVideoEvent,
              onAbort: onVideoEvent,
            }}
          />
        )}
        {'flash' === info.kernel && (
          <GrindPlayer {...info} src={src} grindPlayerSwf={grindPlayerSwf} flashlsOSMFSwf={flashlsOSMFSwf} />
        )}
      </main>
      <aside className="aside">
        <div className="asideContainer">
          <Tabs className="asideTabs" defaultActiveKey="info">
            <Tabs.TabPane tab="信息" key="info">
              <Scrollbars>
                <div className="infoTabPane">
                  <Descriptions title="参数" column={1} size="small">
                    <Descriptions.Item label="kernel">{info.kernel}</Descriptions.Item>
                    <Descriptions.Item label="live">{info.live ? '是' : '否'}</Descriptions.Item>
                    <Descriptions.Item label="src">
                      <span className="srcValue">{src}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="type">{info.type}</Descriptions.Item>
                  </Descriptions>
                </div>
              </Scrollbars>
            </Tabs.TabPane>
            <Tabs.TabPane tab="接口测试" key="interface">
              <Scrollbars>
                <div className="infoTabPane">暂时删除接口测试功能</div>
              </Scrollbars>
            </Tabs.TabPane>
          </Tabs>
          <div className="asideFooter">
            <a href="https://github.com/goblin-laboratory/reactjs-player">
              <Icon type="github" />
              &nbsp; Github
            </a>
          </div>
        </div>
      </aside>
      <footer className="footer">手机观看</footer>
    </div>
  );
});

export default Form.create()(App);
