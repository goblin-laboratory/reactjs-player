import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import ReactPlayer from './components/ReactHlsjsPlayer';
import './App.css';

function App({ form }) {
  const [src, setSrc] = React.useState('');
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
            <Col span={16}>
              <Form.Item>
                {form.getFieldDecorator('src', {
                  initialValue: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
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
        <ReactPlayer src={src} />
      </div>
    </div>
  );
}

export default Form.create()(App);
