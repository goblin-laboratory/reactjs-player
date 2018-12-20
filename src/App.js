import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button } from 'antd';
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
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const protocol = this.props.form.getFieldValue('protocol');
    const info = {
      flv: {
        src: 'http://10.8.123.179:8081/live/liveStream.flv',
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
    }[protocol];
    this.videoRef.current.load({ protocol, ...info });
  };

  render() {
    return (
      <div className="body">
        <div className="selector">
          <Form layout="inline" onSubmit={this.onSubmit}>
            <Form.Item>
              {this.props.form.getFieldDecorator('protocol', {})(
                <Select className="protocolSelector">
                  {this.state.supported.map(it => (
                    <Select.Option key={it} value={it}>
                      {it}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={0 === this.state.supported.length}>
                播放
              </Button>
            </Form.Item>
          </Form>
          {/* <div>
            测试: https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8
            <button type="button" onClick={this.onClick}>
              测试
            </button>
          </div>
          <div>{this.state.supported.join(',')}</div> */}
        </div>
        <div className="player">
          <ReactPlayer ref={this.videoRef} protocols={['flv', 'hls', 'rtmp']} onReady={this.onPlayerReady} />
        </div>
      </div>
    );
  }
}

export default Form.create()(App);
