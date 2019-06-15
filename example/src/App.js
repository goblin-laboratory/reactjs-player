import React from 'react';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import grindPlayerSwf from 'react-player/dist/GrindPlayer.swf';
import flashlsOSMFSwf from 'react-player/dist/flashlsOSMF.swf';
import './App.css';

const GrindPlayer = ReactPlayer.GrindPlayer;

function App({ form }) {
  const [type, setType] = React.useState('hlsjs');
  const [src, setSrc] = React.useState('');

  const onChange = React.useCallback(
    v => {
      setType(v);
      setSrc('');
      const s = {
        hlsjs: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
        flvjs: 'http://fms.cntv.lxdns.com/live/flv/channel89.flv',
        rtmp: 'rtmp://livetv.dhtv.cn:1935/live/news',
        rtmphls: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
      }[v];
      form.setFieldsValue({ src: s });
    },
    [form],
  );
  return (
    <div className="body">
      <div className="selector">
        <Form
          onSubmit={e => {
            e.preventDefault();
            setSrc(form.getFieldValue('src'));
          }}
        >
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item>
                <Select onChange={onChange} value={type}>
                  <Select.Option value="hlsjs">hlsjs</Select.Option>
                  <Select.Option value="flvjs">flvjs</Select.Option>
                  <Select.Option value="rtmp">rtmp</Select.Option>
                  <Select.Option value="rtmphls">rtmphls</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item>
                {form.getFieldDecorator('src', {
                  initialValue: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4}>
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
        {'hlsjs' === type && <ReactPlayer src={src} render={type} />}
        {'flvjs' === type && <ReactPlayer src={src} render={type} live={true} />}
        {'rtmp' === type && (
          <GrindPlayer src={src} type="video/rtmp" grindPlayerSwf={grindPlayerSwf} flashlsOSMFSwf={flashlsOSMFSwf} />
        )}
        {'rtmphls' === type && (
          <GrindPlayer
            src={src}
            type="application/x-mpegURL"
            grindPlayerSwf={grindPlayerSwf}
            flashlsOSMFSwf={flashlsOSMFSwf}
          />
        )}
      </div>
    </div>
  );
}

export default Form.create()(App);
