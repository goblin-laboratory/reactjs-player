import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input, Checkbox, Button, Row, Col } from 'antd';
import ReactPlayer from './lib';
import './App.css';

class App extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      supported: [],
    };

    this.videoRef = React.createRef();
  }

  onPlayerReady = supported => {
    this.setState({ supported });
    if (0 < supported.length) {
      this.props.form.setFieldsValue({ protocol: supported[0] });
      this.onProtocolChange(supported[0]);
    }
  };

  onProtocolChange = value => {
    const info = {
      flv: {
        src: 'https://media01.opensight.cn/flv_srs/quick/WiCWK60YR4CHzyrTJsAiyw.flv',
        isLive: true,
      },
      hls: {
        src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
        isLive: false,
      },
      rtmp: {
        src: 'rtmp://media01.opensight.cn/quick...1545230590_719be8ca7be6a6e64746ae68d1217f68/F4fADCyaQNSW6jItc3Sqyw',
        isLive: true,
      },
    }[value];
    if (info) {
      this.props.form.setFieldsValue(info);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const values = this.props.form.getFieldsValue();
    this.videoRef.current.load(values);
  };

  render() {
    return (
      <div className="body">
        <div className="selector">
          <Form onSubmit={this.onSubmit}>
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item>
                  {this.props.form.getFieldDecorator('protocol', {})(
                    <Select onChange={this.onProtocolChange}>
                      {this.state.supported.map(it => (
                        <Select.Option key={it} value={it}>
                          {it}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item>
                  {this.props.form.getFieldDecorator('src', {
                    initialValue: '',
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {this.props.form.getFieldDecorator('isLive', {
                    initialValue: false,
                    valuePropName: 'checked',
                  })(<Checkbox>&nbsp;直播&nbsp;&nbsp;&nbsp;&nbsp;</Checkbox>)}
                  <Button type="primary" htmlType="submit" disabled={0 === this.state.supported.length}>
                    播放
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="player">
          <ReactPlayer ref={this.videoRef} protocols={['flv', 'hls', 'rtmp']} onReady={this.onPlayerReady} />
        </div>
      </div>
    );
  }
}

export default Form.create()(App);
