import React from 'react';
import UAParser from 'ua-parser-js';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import { Form, Select, Input, Button, Tabs, Descriptions, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactPlayer from 'reactjs-player';
import grindPlayerSwf from 'reactjs-player/dist/GrindPlayer.swf';
import flashlsOSMFSwf from 'reactjs-player/dist/flashlsOSMF.swf';
import blank16x9 from './blank16x9.png';
import './App.css';

// import Interface from './components/Interface';
const Interface = React.lazy(() => import('./components/Interface'));
const GrindPlayer = ReactPlayer.GrindPlayer;

const delay = timeout =>
  new Promise(resolve => {
    global.setTimeout(resolve, timeout);
  });

const getSupportedList = ua => {
  if (ua.device.type) {
    // 非 PC 浏览器
    return [
      {
        key: 'native',
        kernel: 'native',
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL',
      },
      { key: 'nativelive', kernel: 'native', live: true, src: '', type: 'application/x-mpegURL' },
    ];
  }

  global.Hls = Hls;
  global.flvjs = flvjs;

  const list = [];
  if (Hls.isSupported()) {
    list.push({
      key: 'hlsjs',
      kernel: 'hlsjs',
      live: false,
      src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      type: 'application/x-mpegURL',
    });
  }
  if (flvjs.isSupported()) {
    const featureList = flvjs.getFeatureList();
    if (featureList.networkStreamIO) {
      list.push({
        key: 'flvjs',
        kernel: 'flvjs',
        live: true,
        src: '',
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
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      type: 'video/mp4',
    },
  );
  return list;
};

const App = React.memo(({ form }) => {
  const [list, setList] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [src, setSrc] = React.useState('');
  const [videoProps, setVideoProps] = React.useState(null);

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
  }, []);

  const onChange = React.useCallback(
    v => {
      const item = list.find(it => it.key === v);
      form.setFieldsValue({ src: item.src });
    },
    [form, list],
  );

  const onSubmit = React.useCallback(
    async values => {
      setSrc('');
      await delay(50);
      const item = list.find(it => it.key === values.type);
      setInfo(item);
      setSrc(values.src);
    },
    [list],
  );

  // 接口测试
  const ref = React.useRef(null);
  const getPlayer = React.useCallback(() => ref && ref.current, []);

  if (!list || 0 === list.length) {
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
              initialValue:
                'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
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
            ref={ref}
            live={info.live}
            kernel={info.kernel}
            type={info.type}
            config={info.config || {}}
            // {...info}
            src={src}
            poster="https://raw.githubusercontent.com/goblin-laboratory/reactjs-player/master/docs/logo128x128.png"
            videoProps={videoProps}
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
                <div className="infoTabPane">
                  {/* <Interface getPlayer={getPlayer} src={src} /> */}
                  <React.Suspense fallback={null}>
                    <Interface getPlayer={getPlayer} src={src} />
                  </React.Suspense>
                </div>
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
