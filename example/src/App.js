import React from 'react';
import UAParser from 'ua-parser-js';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import grindPlayerSwf from 'react-player/dist/GrindPlayer.swf';
import flashlsOSMFSwf from 'react-player/dist/flashlsOSMF.swf';
import './App.css';

const GrindPlayer = ReactPlayer.GrindPlayer;

const getSupportedList = ua => {
  if (ua.device.type) {
    // 非 PC 浏览器
    return [
      { key: 'native', kernel: 'native', src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8' },
      { key: 'nativelive', kernel: 'native', live: true, src: 'https://tvimg.uwp.ac.cn/cctv5hd.m3u8' },
    ];
  }
  const list = [];
  if (Hls.isSupported()) {
    list.push({ key: 'hlsjs', kernel: 'hlsjs', src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8' });
  }
  if (flvjs.isSupported()) {
    const featureList = flvjs.getFeatureList();
    if (featureList.networkStreamIO) {
      list.push({ key: 'flvjs', kernel: 'flvjs', src: 'http://fms.cntv.lxdns.com/live/flv/channel89.flv' });
    }
  }
  // mac OS 没有测试环境，暂且认为没有问题
  if ('Mac OS' === ua.os.name) {
    list.push(
      { key: 'native', kernel: 'native', src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8' },
      {
        key: 'nativelive',
        kernel: 'native',
        live: true,
        src: 'http://bcliveuniv-lh.akamaihd.net/i/iptv1_1@194050/master.m3u8',
      },
    );
  }
  list.push(
    { key: 'rtmp', kernel: 'rtmp', live: true, type: 'video/rtmp', src: 'rtmp://livetv.dhtv.cn:1935/live/news' },
    {
      key: 'rtmphls',
      kernel: 'rtmphls',
      live: false,
      type: 'application/x-mpegURL',
      src: 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8',
    },
  );
  return list;
};

function App({ form }) {
  const [list, setList] = React.useState([]);
  const [info, setInfo] = React.useState(null);
  const [src, setSrc] = React.useState('');
  const [x5playsinline, setX5playsinline] = React.useState(false);
  const [fullscreenState, setX5videofullscreen] = React.useState({ x5videofullscreen: false, fullscreen: false });

  React.useEffect(() => {
    const ua = UAParser(global.navigator.userAgent);

    const supportedList = getSupportedList(ua);
    setList(supportedList);
    setInfo(supportedList[0]);

    setX5playsinline('Android' === ua.os.name && 'WeChat' === ua.browser.name);
  }, []);

  const onChange = React.useCallback(
    v => {
      setSrc('');
      const item = list.find(it => it.key === v);
      setInfo(item);
      form.setFieldsValue({ src: item.src });
    },
    [form, list],
  );

  const onX5VideoFullscreenChange = React.useCallback(
    v => {
      if (x5playsinline) {
        setX5videofullscreen(v);
      } else {
        setX5videofullscreen({ x5videofullscreen: false, fullscreen: false });
      }
    },
    [x5playsinline],
  );

  if (!info || 0 === list.length) {
    return null;
  }
  const style = {};
  if (fullscreenState.x5videofullscreen) {
    // style.position = 'absolute';
    // style.width = '100%';
    if (fullscreenState.fullscreen) {
      style.display = 'none';
    }
  }
  let className = 'body';
  if (fullscreenState.x5videofullscreen) {
    className += ' x5videofullscreen';
    if (fullscreenState.fullscreen) {
      className += ' fullscreen';
    }
  }
  return (
    <div className={className}>
      <div className="selector">
        <Form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            setSrc(form.getFieldValue('src'));
          }}
        >
          <Row gutter={16}>
            <Col xs={8} lg={4}>
              <Form.Item>
                {/* <Form.Item>
                  {form.getFieldDecorator('src', {
                    initialValue: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
                  })(<Input />)}
                </Form.Item> */}
                <Select onChange={onChange} value={info.kernel}>
                  {list.map(it => (
                    <Select.Option key={it.key} value={it.key}>
                      {it.kernel}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={8} lg={16}>
              <Form.Item>
                {form.getFieldDecorator('src', {
                  initialValue: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xs={8} lg={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  播放
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="player">
        {'rtmp' !== info.kernel && 'rtmphls' !== info.kernel && (
          <ReactPlayer
            {...info}
            src={src}
            poster="https://raw.githubusercontent.com/goblin-laboratory/react-player/master/logo128x128.png"
            x5playsinline={x5playsinline}
            onX5VideoFullscreenChange={onX5VideoFullscreenChange}
            objectPosition="center 92px"
          />
        )}
        {('rtmp' === info.kernel || 'rtmphls' === info.kernel) && (
          <GrindPlayer {...info} src={src} grindPlayerSwf={grindPlayerSwf} flashlsOSMFSwf={flashlsOSMFSwf} />
        )}
      </div>
    </div>
  );
}

export default Form.create()(App);
