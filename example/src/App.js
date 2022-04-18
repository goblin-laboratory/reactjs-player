import React from 'react';
import UAParser from 'ua-parser-js';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import { Form, Select, Input, Button, Tabs, Descriptions } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactjsPlayer from 'reactjs-player';
import grindPlayerSwf from 'reactjs-player/dist/GrindPlayer.swf';
import flashlsOSMFSwf from 'reactjs-player/dist/flashlsOSMF.swf';
import PlaybackRate from './PlaybackRate';
import FouceLive from './FouceLive';
import blank16x9 from './blank16x9.png';
import './App.css';

const GrindPlayer = ReactjsPlayer.GrindPlayer;
// const ReactPlayerContext = ReactjsPlayer.ReactPlayerContext;

const delay = (timeout) =>
  new Promise((resolve) => {
    global.setTimeout(resolve, timeout);
  });

const getSupportedList = (ua) => {
  if (ua.device.type) {
    // 非 PC 浏览器
    return [
      {
        key: 'nativelive',
        kernel: 'native',
        live: true,
        src: 'https://ivt.demo.qulubo.net/hls_srs/quick/IV9x5jjUSbycqi0PtSiqpw.m3u8',
        type: 'application/x-mpegURL',
      },
      {
        key: 'native',
        kernel: 'native',
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL',
      },
      {
        key: 'srswebrtc',
        kernel: 'srswebrtc',
        live: true,
        src: 'webrtc://192.168.0.225/quick/ClpheNxgRBy_XDhXXDq_CQ?vc=ivWxqY',
        type: '',
      },
    ];
  }

  global.Hls = Hls;
  global.flvjs = flvjs;

  const list = [];

  if (Hls.isSupported()) {
    list.push(
      {
        key: 'hlsjs-live',
        kernel: 'hlsjs',
        live: true,
        src: 'http://192.168.0.222/hls_srs/quick/1VU0lHXqSva4TFvmJyqVqg.m3u8',
        type: 'application/x-mpegURL',
      },
      {
        key: 'hlsjs',
        kernel: 'hlsjs',
        live: false,
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL',
      },
    );
  }
  // https://ivt.demo.qulubo.net/hls_srs/quick/IV9x5jjUSbycqi0PtSiqpw.m3u8
  if (flvjs.isSupported()) {
    const featureList = flvjs.getFeatureList();
    if (featureList.networkStreamIO) {
      list.push({
        key: 'flvjs',
        kernel: 'flvjs',
        live: true,
        src: 'http://192.168.0.222/flv_srs/quick/1VU0lHXqSva4TFvmJyqVqg.flv',
        type: 'video/x-flv',
        config: {
          isLive: true,
          enableStashBuffer: false,
          autoCleanupSourceBuffer: true,
          stashInitialSize: 16 * 1024,
          fixAudioTimestampGap: false,
        },
      });
    }
  }

  // mac OS 没有测试环境，暂且认为没有问题
  if ('Mac OS' === ua.os.name) {
    list.push(
      {
        key: 'native',
        kernel: 'native',
        live: false,
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL',
      },
      { key: 'nativelive', kernel: 'native', live: true, src: '', type: 'application/x-mpegURL' },
    );
  }
  list.push(
    { key: 'rtmp', kernel: 'flash', live: true, src: 'rtmp://livetv.dhtv.cn:1935/live/news', type: 'video/rtmp' },
    {
      key: 'flashls',
      kernel: 'flash',
      live: false,
      src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      type: 'application/x-mpegURL',
    },
    {
      key: 'native',
      kernel: 'native',
      live: false,
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      type: 'video/mp4',
    },
    {
      key: 'srswebrtc',
      kernel: 'srswebrtc',
      live: true,
      src: 'webrtc://192.168.0.222/quick/1VU0lHXqSva4TFvmJyqVqg',
      type: '',
    },
  );
  return list;
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

  if (!list || 0 === list.length) {
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
          initialValues={{
            type: list[0].key,
            src: list[0].src,
          }}
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
          {'flash' === info.kernel && (
            <GrindPlayer {...info} src={src} grindPlayerSwf={grindPlayerSwf} flashlsOSMFSwf={flashlsOSMFSwf} />
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
