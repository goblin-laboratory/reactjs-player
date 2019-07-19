import React from 'react';
import UAParser from 'ua-parser-js';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import { Form, Select, Input, Button, Tabs, Descriptions, Divider, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactPlayer from 'reactjs-player';
import grindPlayerSwf from 'reactjs-player/dist/GrindPlayer.swf';
import flashlsOSMFSwf from 'reactjs-player/dist/flashlsOSMF.swf';
import blank16x9 from './blank16x9.png';
import './App.css';

const GrindPlayer = ReactPlayer.GrindPlayer;

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
      list.push({ key: 'flvjs', kernel: 'flvjs', live: true, src: '', type: 'video/x-flv' });
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
  );
  return list;
};

const App = React.memo(({ form }) => {
  const [list, setList] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [src, setSrc] = React.useState('');
  const [x5playsinline, setX5playsinline] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState({ x5videofullscreen: false, fullscreen: false });
  const [videoProps, setVideoProps] = React.useState(null);

  React.useEffect(() => {
    const ua = UAParser(global.navigator.userAgent);
    if (ua.device.type) {
      setVideoProps({
        playsInline: true,
        'webkit-playsinline': 'true',
        'x5-playsinline': 'true',
        'x5-video-player-type': 'h5',
        'x5-video-player-fullscreen': 'true',
        'x5-video-orientation': 'landscape|portrait',
      });
    }
    setX5playsinline('Android' === ua.os.name && 'WeChat' === ua.browser.name);
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
    values => {
      const item = list.find(it => it.key === values.type);
      setInfo(item);
      setSrc(values.src);
    },
    [list],
  );

  const onFullscreenChange = React.useCallback(v => {
    setFullscreen(v);
  }, []);

  // 接口测试
  const [isPlayingResult, setIsPlayingResult] = React.useState('--');
  const [getCurrentTimeResult, setGetCurrentTimeResult] = React.useState('--');
  const [setCurrentTimeResult, setSetCurrentTimeResult] = React.useState('--');
  const [getBufferedResult, setGetBufferedResult] = React.useState('--');
  const [setPlaybackRateResult, setSetPlaybackRateResult] = React.useState('--');
  const [getPlaybackRateResult, setGetPlaybackRateResult] = React.useState('--');
  const [isFullscreenResult, setIsFullscreenResult] = React.useState('--');
  const [isPiPResult, setIsPiPResultResult] = React.useState('--');

  const ref = React.useRef(null);

  const onIsPlayingClick = React.useCallback(() => {
    if (ref && ref.current) {
      setIsPlayingResult(ref.current.isPlaying().toString());
    } else {
      setIsPlayingResult('--');
    }
  }, []);

  React.useEffect(() => {
    setIsPlayingResult('--');
    setGetCurrentTimeResult('--');
    setSetCurrentTimeResult('--');
    setGetBufferedResult('--');
    setSetPlaybackRateResult('--');
    setGetPlaybackRateResult('--');
    setIsFullscreenResult('--');
    setIsPiPResultResult('--');
  }, [src]);

  if (!list || 0 === list.length) {
    return null;
  }

  const bodyClassNames = ['container'];
  // const vidoeStyle = {};
  if (fullscreen.x5videofullscreen) {
    bodyClassNames.push('x5videofullscreen');
    // vidoeStyle.objectPosition = 'center 0';
    if (fullscreen.fullscreen) {
      bodyClassNames.push('fullscreen');
      // vidoeStyle.objectPosition = 'center center';
    }
  }

  return (
    <div className={bodyClassNames.join(' ')}>
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
            {...info}
            src={src}
            poster="https://raw.githubusercontent.com/goblin-laboratory/react-player/master/logo128x128.png"
            x5playsinline={x5playsinline}
            onFullscreenChange={onFullscreenChange}
            videoProps={videoProps}
          />
        )}
        {'flash' === info.kernel && (
          <GrindPlayer {...info} src={src} grindPlayerSwf={grindPlayerSwf} flashlsOSMFSwf={flashlsOSMFSwf} />
        )}
      </main>
      <aside className="aside">
        <div className="asideContainer">
          <Tabs className="asideTabs" activeKey="info">
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
                  <Divider>接口测试</Divider>
                  <table className="testTable">
                    <thead>
                      <tr>
                        <th>接口</th>
                        <th className="testActionTitle">运行</th>
                        <th>结果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>isPlaying</td>
                        <td className="testAction" onClick={onIsPlayingClick}>
                          <Icon type="play-circle" />
                        </td>
                        <td>{isPlayingResult}</td>
                      </tr>
                      <tr>
                        <td>getCurrentTime</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{getCurrentTimeResult}</td>
                      </tr>
                      <tr>
                        <td>setCurrentTime</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{setCurrentTimeResult}</td>
                      </tr>
                      <tr>
                        <td>getBuffered</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{getBufferedResult}</td>
                      </tr>
                      <tr>
                        <td>setPlaybackRate</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{setPlaybackRateResult}</td>
                      </tr>
                      <tr>
                        <td>getPlaybackRate</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{getPlaybackRateResult}</td>
                      </tr>
                      <tr>
                        <td>isPiP</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{isPiPResult}</td>
                      </tr>
                      <tr>
                        <td>isFullscreen</td>
                        <td className="testAction">
                          <Icon type="play-circle" />
                        </td>
                        <td>{isFullscreenResult}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Scrollbars>
            </Tabs.TabPane>
          </Tabs>
          <div className="asideFooter">
            <a href="https://github.com/goblin-laboratory/react-player">
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
