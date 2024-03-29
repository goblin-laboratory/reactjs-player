import React from 'react';
import UAParser from 'ua-parser-js';
import { Form, Select, Input, Button, Tabs, Descriptions } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';

import Hls from 'hls.js';
import flvjs from 'flv.js';
import { AliRTS } from 'aliyun-rts-sdk/dist/aliyun-rts-sdk-without-adapter.js';
import ReactjsPlayer from 'reactjs-player';
// import grindPlayerSwf from 'reactjs-player/dist/GrindPlayer.swf';
// import flashlsOSMFSwf from 'reactjs-player/dist/flashlsOSMF.swf';

import PlaybackRate from './PlaybackRate';
import FouceLive from './FouceLive';
import blank16x9 from './blank16x9.png';
import './App.css';

// const GrindPlayer = ReactjsPlayer.GrindPlayer;
// const ReactPlayerContext = ReactjsPlayer.ReactPlayerContext;
global.Hls = Hls;
global.flvjs = flvjs;
global.AliRTS = AliRTS;

const delay = (timeout) =>
  new Promise((resolve) => {
    global.setTimeout(resolve, timeout);
  });

const getSupportedList = (ua) => {
  return [
    {
      key: 'srswebrtc',
      kernel: 'srswebrtc',
      live: true,
      src: 'webrtc://219.138.162.218/quick/r6uh_z7RSY2ovBplSgZjEw',
      type: '',
      config: {
        // api: '',
        // hostname: '',
      },
    },
    {
      key: 'alirts',
      kernel: 'alirts',
      live: true,
      src: 'artc://a.lcdn.opensight.cn/alicdn/LULAyun4Q0ibCpSuj1vSrw?auth_key=1687020149-0-0-fc7129da8b191fb3c1c08805ca5fa3ee',
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
  ];
};

const App = React.memo(() => {
  const [list, setList] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [src, setSrc] = React.useState('');
  const [videoProps, setVideoProps] = React.useState(null);
  const ref = React.useRef(list);

  const [form] = Form.useForm();

  const onChange = React.useCallback(
    (v) => {
      const item = list.find((it) => it.key === v);
      form.setFieldsValue({ src: item.src });
    },
    [form, list],
  );

  const onSubmit = React.useCallback(async (values) => {
    setSrc('');
    await delay(50);
    const item = ref.current.find((it) => it.key === values.type);
    setInfo(item);
    setSrc(values.src);
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
    ref.current = supportedList;
    setInfo(supportedList[0]);
    // NOTE: 测试自动播放的情况
    onSubmit({ type: supportedList[0].key, src: supportedList[0].src });
  }, [onSubmit]);

  const onVideoEvent = React.useCallback((e) => {
    const log = console.log;
    log(`e.type: ${e.type}`);
    // if ('durationchange' === e.type) {
    //   log(`durationchange: ${e.target.duration}`);
    // }
  }, []);

  if (!list || 0 === list.length || !info) {
    return null;
  }

  return (
    <div className="container">
      <header className="header">
        <Form
          className="form"
          layout="inline"
          form={form}
          onFinish={onSubmit}
          initialValues={{ type: info.key, src: info.src }}
        >
          <Form.Item className="type" name="type">
            <Select onChange={onChange}>
              {list.map((it) => (
                <Select.Option key={it.key} value={it.key}>
                  {it.key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="src" name="src">
            <Input />
          </Form.Item>
          <Form.Item className="submit">
            <Button type="primary" htmlType="submit">
              播放
            </Button>
          </Form.Item>
        </Form>
      </header>
      <main className="main">
        <div className="player">
          <img className="blankImg" src={blank16x9} alt="" />
          {'flash' !== info.kernel && (
            <ReactjsPlayer
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
            >
              <PlaybackRate></PlaybackRate>
              {'flvjs' === info.kernel && info.live && <FouceLive></FouceLive>}
            </ReactjsPlayer>
          )}
        </div>
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
                <GithubOutlined />
                &nbsp; Github
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
});

export default App;
