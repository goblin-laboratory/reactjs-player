'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var numeral = _interopDefault(require('numeral'));
var antd = require('antd');
var Hls = _interopDefault(require('hls.js'));
var flvjs = _interopDefault(require('flv.js'));
var ReactSWF = _interopDefault(require('react-swf'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".index-module_slider__Za-8u,\n.index-module_slidingSlider__3gRQj {\n  position: relative;\n  height: 20px;\n  cursor: pointer;\n}\n.index-module_sliderRail__3tNs7 {\n  position: absolute;\n  left: 0;\n  top: 8px;\n  width: 100%;\n  height: 4px;\n  background-color: rgba(255, 255, 255, 0.2);\n  transition: background-color 0.3s;\n  overflow: hidden;\n}\n.index-module_sliderBuffered__3hgu8 {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.5);\n  transition: background-color 0.3s;\n  transform: translate(-100%, 0);\n}\n.index-module_sliderTrack__PJZ0o {\n  position: absolute;\n  background: #ff0000;\n  transition: background-color 0.3s ease;\n  width: 100%;\n  height: 100%;\n  transform: translate(-100%, 0);\n}\n.index-module_sliderHandleRail__3a1BQ {\n  position: absolute;\n  left: 0;\n  top: 4px;\n  width: 100%;\n  height: 12px;\n  transform: translate(-100%, 0);\n}\n.index-module_sliderHandle__1T8w2 {\n  position: absolute;\n  top: 0;\n  right: -6px;\n  width: 12px;\n  height: 12px;\n  cursor: pointer;\n  border-radius: 50%;\n  box-shadow: 0;\n  visibility: hidden;\n  background: #ff0000;\n  border: none 0 transparent;\n  outline: none;\n}\n.index-module_sliderHandle__1T8w2:focus {\n  box-shadow: 0 0 0 5px rgba(255, 0, 0, 0.2);\n}\n.index-module_slidingSlider__3gRQj .index-module_sliderHandle__1T8w2 {\n  visibility: visible;\n}\n.index-module_slider__Za-8u:hover .index-module_sliderHandle__1T8w2 {\n  visibility: visible;\n}\n";
var styles = {"slider":"index-module_slider__Za-8u","slidingSlider":"index-module_slidingSlider__3gRQj","sliderRail":"index-module_sliderRail__3tNs7","sliderBuffered":"index-module_sliderBuffered__3hgu8","sliderTrack":"index-module_sliderTrack__PJZ0o","sliderHandleRail":"index-module_sliderHandleRail__3a1BQ","sliderHandle":"index-module_sliderHandle__1T8w2"};
styleInject(css);

var getBufferedEnd = function getBufferedEnd(currentTime, buffered) {
  if (!buffered) {
    return 0;
  }

  for (var i = buffered.length - 1; 0 <= i; i -= 1) {
    var end = buffered.end(i);

    if (currentTime <= end && buffered.start(i) <= currentTime) {
      return end;
    }
  }

  return 0;
};

var getValue = function getValue(e, rect, duration) {
  var w = e.clientX - rect.left;

  if (0 >= w) {
    return 0;
  }

  if (w >= rect.width) {
    return duration;
  }

  return Math.round(duration * (e.clientX - rect.left) / rect.width);
};

var getBufferedTranslateX = function getBufferedTranslateX(_ref) {
  var buffered = _ref.buffered,
      currentTime = _ref.currentTime,
      sliding = _ref.sliding,
      duration = _ref.duration;

  if (0 >= duration || sliding) {
    return '-100%';
  }

  var e = getBufferedEnd(currentTime, buffered);
  return "".concat(100 * e / duration - 100, "%");
};

var getTrackTranslateX = function getTrackTranslateX(_ref2) {
  var duration = _ref2.duration,
      currentTime = _ref2.currentTime,
      value = _ref2.value,
      sliding = _ref2.sliding;

  if (0 > duration) {
    return '0';
  }

  if (0 === duration) {
    return '-100%';
  }

  if (sliding) {
    return "".concat(100 * value / duration - 100, "%");
  }

  return "".concat(100 * currentTime / duration - 100, "%");
};

var Slider = React.memo(function (_ref3) {
  var currentTime = _ref3.currentTime,
      duration = _ref3.duration,
      buffered = _ref3.buffered,
      onChange = _ref3.onChange;

  var _React$useState = React.useState(currentTime),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      sliding = _React$useState4[0],
      setSliding = _React$useState4[1];

  var sliderRef = React.useRef(null);
  var rectRef = React.useRef(null);
  React.useEffect(function () {
    if (sliding && sliderRef && sliderRef.current) {
      rectRef.current = sliderRef.current.getBoundingClientRect();
    }

    return function () {
      rectRef.current = null;
    };
  }, [sliding]);
  var onClick = React.useCallback(function (e) {
    e.preventDefault();
    var rect = e.currentTarget.getBoundingClientRect();
    var v = getValue(e, rect, duration);
    onChange(v);
    setSliding(false);
  }, [onChange, duration]);
  var onMouseUp = React.useCallback(function (e) {
    e.preventDefault();

    if (!rectRef || !rectRef.current) {
      return;
    }

    var v = getValue(e, rectRef.current, duration);
    onChange(v);
    setSliding(false);
  }, [onChange, duration]);
  var onMouseMove = React.useCallback(function (e) {
    e.preventDefault();

    if (!rectRef || !rectRef.current) {
      return;
    }

    var v = getValue(e, rectRef.current, duration);
    setValue(v);
  }, [duration]);
  var onMouseDown = React.useCallback(function (e) {
    e.preventDefault();
    setSliding(true);
  }, []);
  React.useEffect(function () {
    if (sliding) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      return function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    } else {
      return function () {};
    }
  }, [sliding, onMouseMove, onMouseUp]);
  var bufferedTranslateX = getBufferedTranslateX({
    buffered: buffered,
    currentTime: currentTime,
    sliding: sliding,
    duration: duration
  });
  var trackTranslateX = getTrackTranslateX({
    duration: duration,
    currentTime: currentTime,
    value: value,
    sliding: sliding
  });
  return React.createElement("div", {
    className: sliding ? styles.slidingSlider : styles.slider,
    ref: sliderRef,
    onClick: onClick
  }, React.createElement("div", {
    className: styles.sliderRail
  }, React.createElement("div", {
    className: styles.sliderBuffered,
    style: {
      transform: "translateX(".concat(bufferedTranslateX, ")")
    }
  }), React.createElement("div", {
    className: styles.sliderTrack,
    style: {
      transform: "translateX(".concat(trackTranslateX, ")")
    }
  })), React.createElement("div", {
    className: styles.sliderHandleRail,
    style: {
      transform: "translateX(".concat(trackTranslateX, ")")
    }
  }, React.createElement("div", {
    tabIndex: 0,
    className: styles.sliderHandle,
    onMouseDown: onMouseDown // onTouchStart={this.onTouchStart}

  })));
});
Slider.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  onChange: PropTypes.func,
  setSliding: PropTypes.func
};
Slider.defaultProps = {
  currentTime: 0,
  buffered: null,
  duration: 0,
  onChange: function onChange() {},
  setSliding: function setSliding() {}
};

var css$1 = ".index-module_absolute__cPxTn {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n.index-module_reactPlayerSkin__T5sda {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.index-module_controls__2BzYi {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  padding: 0 16px;\n  transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);\n  overflow: hidden;\n  color: #fff;\n}\n.index-module_hiddenControls__QF8y7 {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  padding: 0 16px;\n  transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);\n  overflow: hidden;\n  color: #fff;\n  transform: translate(0, 46px);\n}\n.index-module_waiting__2ykzZ,\n.index-module_ended__34SNQ,\n.index-module_loading__2hpf6 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 50px;\n}\n.index-module_playerMsg__3JOcN {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  padding: 2em;\n  background: rgba(0, 0, 0, 0.65);\n  overflow-y: auto;\n}\nbutton.index-module_ended__34SNQ {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  cursor: pointer;\n  background-color: transparent;\n  outline: 0 none transparent;\n}\n.index-module_bar__3PNIv {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  padding: 0 8px 4px;\n}\n.index-module_bar__3PNIv button {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  cursor: pointer;\n  background-color: transparent;\n  width: 32px;\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n  outline: 0 none transparent;\n  display: inline-block;\n  vertical-align: bottom;\n}\n.index-module_bar__3PNIv .index-module_textBtn__87xqT {\n  width: auto;\n  padding: 0 8px;\n  font-size: 14px;\n}\n.index-module_flexItem__25tbu {\n  flex: 1;\n}\n.index-module_controlText__3a7jG {\n  height: 32px;\n  line-height: 32px;\n  font-size: 14px;\n  display: inline-block;\n  padding: 0 8px;\n}\n.index-module_volumeSlider__31qjt {\n  height: 32px;\n  line-height: 32px;\n  font-size: 14px;\n  display: inline-block;\n  padding: 0 8px;\n  width: 120px;\n  vertical-align: bottom;\n  padding-left: 4px;\n  padding-right: 12px;\n}\n.index-module_volumeSlider__31qjt .ant-slider {\n  margin-top: 10px;\n}\n.index-module_volumeSlider__31qjt .ant-slider-rail {\n  background: rgba(255, 255, 255, 0.2);\n}\n.index-module_volumeSlider__31qjt .ant-slider-rail {\n  background: rgba(255, 255, 255, 0.2);\n}\n.index-module_volumeSlider__31qjt .ant-slider-track {\n  background: rgba(255, 255, 255, 0.85);\n}\n.index-module_volumeSlider__31qjt .ant-slider-handle {\n  background: rgba(255, 255, 255, 0.85);\n  border: none 0 transparent;\n}\n.index-module_volumeSlider__31qjt .ant-slider-handle:focus {\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_volumeSlider__31qjt .ant-slider:hover .ant-slider-rail {\n  background: rgba(255, 255, 255, 0.2);\n}\n.index-module_volumeSlider__31qjt .ant-slider:hover .ant-slider-track {\n  background: rgba(255, 255, 255, 0.85);\n}\n.index-module_volumeSlider__31qjt .ant-slider:hover .ant-slider-handle {\n  background: rgba(255, 255, 255, 0.85);\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_volumeSlider__31qjt .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_volumeSlider__31qjt .ant-slider:hover .ant-slider-handle:focus {\n  border: none 0 transparent;\n  box-shadow: none;\n}\n.index-module_liveDot__1xpHV {\n  width: 6px;\n  height: 6px;\n  display: inline-block;\n  border-radius: 50%;\n  background: #ff0000;\n  margin-right: 8px;\n  vertical-align: middle;\n  position: relative;\n  top: -2px;\n}\n@media (max-width: 575px) {\n  .index-module_volume__b7UTa {\n    display: none;\n  }\n}\n";
var styles$1 = {"absolute":"index-module_absolute__cPxTn","reactPlayerSkin":"index-module_reactPlayerSkin__T5sda","controls":"index-module_controls__2BzYi","hiddenControls":"index-module_hiddenControls__QF8y7","waiting":"index-module_waiting__2ykzZ","ended":"index-module_ended__34SNQ","loading":"index-module_loading__2hpf6","playerMsg":"index-module_playerMsg__3JOcN","bar":"index-module_bar__3PNIv","textBtn":"index-module_textBtn__87xqT","flexItem":"index-module_flexItem__25tbu","controlText":"index-module_controlText__3a7jG","volumeSlider":"index-module_volumeSlider__31qjt","liveDot":"index-module_liveDot__1xpHV","volume":"index-module_volume__b7UTa"};
styleInject(css$1);

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref =
/*#__PURE__*/
React.createElement("defs", null, React.createElement("style", null));

var _ref2 =
/*#__PURE__*/
React.createElement("path", {
  d: "M825.757 495.72l126.376-126.644c10.847-10.901 10.847-28.52-.026-39.394-10.875-10.833-28.48-10.847-39.355.027L786.266 456.45 659.782 329.71c-10.875-10.873-28.508-10.86-39.383-.027-10.847 10.873-10.847 28.493-.026 39.394l126.403 126.643-126.403 126.604c-10.82 10.9-10.82 28.52.026 39.393 5.451 5.41 12.565 8.135 19.678 8.135 7.14 0 14.28-2.725 19.705-8.163l126.485-126.716 126.486 126.716c5.424 5.437 12.563 8.163 19.704 8.163a27.761 27.761 0 0 0 19.65-8.135c10.874-10.873 10.874-28.492.027-39.393L825.757 495.719zM473.854 155.018c-9.484-4.674-20.712-3.666-29.134 2.616L216.524 328.428H97.614c-15.398 0-27.852 12.455-27.852 27.84v315.6c0 15.383 12.454 27.84 27.852 27.84h118.91l228.195 170.791a27.722 27.722 0 0 0 16.652 5.546c4.251 0 8.503-.981 12.482-2.93a27.888 27.888 0 0 0 15.344-24.908v-668.28a27.887 27.887 0 0 0-15.343-24.908zm-40.308 637.579L242.44 649.562a27.883 27.883 0 0 0-16.652-5.546H125.413V384.119H225.79a27.876 27.876 0 0 0 16.652-5.546l191.105-143.036v557.06z",
  fill: "#fff"
});

var SvgMuted = function SvgMuted(props) {
  return React.createElement("svg", _extends$1({
    className: "muted_svg__icon",
    viewBox: "0 0 1024 1024",
    width: 64,
    height: 64
  }, props), _ref, _ref2);
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$1 =
/*#__PURE__*/
React.createElement("defs", null, React.createElement("style", null));

var _ref2$1 =
/*#__PURE__*/
React.createElement("path", {
  d: "M840.088 168.005c-10.785-11.282-28.76-11.697-40.044-.939-11.31 10.798-11.725 28.676-.938 39.96 70.794 73.997 111.39 182.55 111.39 297.807 0 115.27-40.596 223.823-111.418 297.835-10.786 11.282-10.372 29.16.939 39.946a28.305 28.305 0 0 0 19.552 7.81c7.466 0 14.906-2.929 20.49-8.75C920.81 757.274 967.13 634.51 967.13 504.832c0-129.651-46.32-252.417-127.042-336.828zM745.18 254.45c-11.172-10.867-29.092-10.674-40.044.498-10.922 11.185-10.701 29.063.498 39.959 52.128 50.77 82.05 127.314 82.05 209.954 0 82.64-29.922 159.143-82.05 209.914-11.2 10.908-11.42 28.786-.498 39.958a28.27 28.27 0 0 0 20.271 8.53 28.285 28.285 0 0 0 19.773-8.032c62.995-61.363 99.14-152.616 99.14-250.37 0-97.795-36.146-189.035-99.14-250.41zm-96.458 85.959c-12.112-9.886-29.95-7.978-39.85 4.05-9.872 12.085-8.046 29.893 4.066 39.766 32.521 26.435 51.934 71.538 51.934 120.635 0 48.394-18.997 93.121-50.8 119.642-12.003 10.01-13.58 27.832-3.567 39.82 5.614 6.663 13.66 10.12 21.764 10.12a28.326 28.326 0 0 0 18.142-6.566c44.522-37.14 71.099-98.1 71.099-163.015-.002-65.925-27.214-127.37-72.788-164.452zM472.289 140.533c-9.568-4.73-21.1-3.761-29.645 2.64L210.35 316.489H89.28c-15.651 0-28.317 12.638-28.317 28.247v320.236c0 15.624 12.666 28.26 28.317 28.26h121.07l232.294 173.302c4.977 3.733 10.95 5.626 16.95 5.626a28.79 28.79 0 0 0 12.694-2.97c9.569-4.8 15.625-14.576 15.625-25.277V165.807c0-10.715-6.056-20.477-15.624-25.274zm-41.011 646.982L236.73 642.351a28.45 28.45 0 0 0-16.952-5.628H117.598V372.997h102.181a28.453 28.453 0 0 0 16.952-5.627l194.547-145.164v565.309z",
  fill: "#fff"
});

var SvgUnmuted = function SvgUnmuted(props) {
  return React.createElement("svg", _extends$2({
    className: "unmuted_svg__icon",
    viewBox: "0 0 1024 1024",
    width: 64,
    height: 64
  }, props), _ref$1, _ref2$1);
};

var ReactPlayerSkin = React.memo(function (_ref) {
  var controls = _ref.controls,
      loading = _ref.loading,
      paused = _ref.paused,
      waiting = _ref.waiting,
      seeking = _ref.seeking,
      ended = _ref.ended,
      duration = _ref.duration,
      currentTime = _ref.currentTime,
      buffered = _ref.buffered,
      muted = _ref.muted,
      volume = _ref.volume,
      playbackRate = _ref.playbackRate,
      fullscreen = _ref.fullscreen,
      changeCurrentTime = _ref.changeCurrentTime,
      onPauseClick = _ref.onPauseClick,
      onPlayClick = _ref.onPlayClick,
      onMutedClick = _ref.onMutedClick,
      changeVolume = _ref.changeVolume,
      onPiPClick = _ref.onPiPClick,
      requestFullscreen = _ref.requestFullscreen,
      exitFullscreen = _ref.exitFullscreen,
      changePlaybackRate = _ref.changePlaybackRate,
      playerMsg = _ref.playerMsg;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hiding = _React$useState2[0],
      setHiding = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      hovering = _React$useState4[0],
      setHovering = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      sliding = _React$useState6[0],
      setSliding = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      visible = _React$useState8[0],
      setVisible = _React$useState8[1];

  React.useEffect(function () {
    if (hiding || hovering || sliding) {
      return function () {};
    }

    var id = setTimeout(function () {
      return setHiding(true);
    }, 3000);
    return function () {
      return clearTimeout(id);
    };
  }, [hiding, hovering, sliding]);
  React.useEffect(function () {
    if (hiding) {
      setVisible(false);
    }

    return function () {};
  }, [hiding]);
  var onBodyClick = React.useCallback(function () {
    return setVisible(false);
  }, []);
  React.useEffect(function () {
    document.body.addEventListener('click', onBodyClick);
    return function () {
      return document.body.removeEventListener('click', onBodyClick);
    };
  }, [onBodyClick]);
  var onMenuClick = React.useCallback(function (e) {
    changePlaybackRate(parseFloat(e.key, 10));
    setVisible(false);
  }, [changePlaybackRate]);

  if (!controls) {
    return React.createElement("div", {
      className: styles$1.reactPlayerSkin
    });
  }

  return React.createElement("div", {
    className: styles$1.reactPlayerSkin,
    onMouseMove: function onMouseMove() {
      return setHiding(false);
    }
  }, (waiting || seeking) && !loading && React.createElement("div", {
    className: styles$1.waiting
  }, React.createElement(antd.Icon, {
    type: "loading"
  })), ended && React.createElement("button", {
    className: styles$1.ended,
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "play-circle"
  })), React.createElement("div", {
    className: hiding && !hovering && !sliding ? styles$1.hiddenControls : styles$1.controls,
    onMouseEnter: function onMouseEnter() {
      return setHovering(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovering(false);
    }
  }, React.createElement(Slider, {
    duration: duration,
    currentTime: currentTime,
    buffered: buffered,
    setSliding: setSliding,
    onChange: changeCurrentTime
  }), React.createElement("div", {
    className: styles$1.bar
  }, React.createElement("div", {
    className: styles$1.flexItem
  }, ended && React.createElement("button", {
    type: "button",
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "caret-right"
  })), paused && !ended && React.createElement("button", {
    type: "button",
    onClick: onPlayClick
  }, React.createElement(antd.Icon, {
    type: "caret-right"
  })), !paused && !ended && React.createElement("button", {
    type: "button",
    onClick: onPauseClick
  }, React.createElement(antd.Icon, {
    type: "pause"
  })), React.createElement("span", {
    className: styles$1.volume
  }, (muted || 0 === volume) && React.createElement("button", {
    type: "button",
    onClick: onMutedClick
  }, React.createElement(antd.Icon, {
    component: SvgMuted
  })), !muted && 0 !== volume && React.createElement("button", {
    type: "button",
    onClick: onMutedClick
  }, React.createElement(antd.Icon, {
    component: SvgUnmuted
  })), React.createElement("span", {
    className: styles$1.volumeSlider
  }, React.createElement(antd.Slider, {
    value: volume,
    onChange: changeVolume,
    max: 1,
    step: 0.1,
    tipFormatter: function tipFormatter(v) {
      return v * 100;
    }
  }))), React.createElement("span", {
    className: styles$1.controlText
  }, numeral(currentTime).format('00:00:00'), 0 <= duration ? " / ".concat(numeral(duration).format('00:00:00')) : ''), 0 > duration && React.createElement("span", {
    className: styles$1.controlText
  }, React.createElement("span", {
    className: styles$1.liveDot
  }), "\u76F4\u64AD")), document.pictureInPictureEnabled && React.createElement("button", {
    type: "button",
    className: styles$1.textBtn,
    onClick: onPiPClick
  }, "\u753B\u4E2D\u753B"), 0 <= duration && React.createElement(antd.Dropdown, {
    visible: visible,
    overlay: React.createElement(antd.Menu, {
      selectedKeys: [playbackRate.toString()],
      onClick: onMenuClick
    }, React.createElement(antd.Menu.Item, {
      key: "0.25"
    }, "\xA0\xA00.25 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "0.5"
    }, "\xA0\xA00.5 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "1"
    }, "\xA0\xA01 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "1.25"
    }, "\xA0\xA01.25 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "1.5"
    }, "\xA0\xA01.5 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "2"
    }, "\xA0\xA02 \u500D\u901F\xA0\xA0"), React.createElement(antd.Menu.Item, {
      key: "4"
    }, "\xA0\xA04 \u500D\u901F\xA0\xA0")),
    placement: "topRight",
    trigger: ['click']
  }, React.createElement("button", {
    type: "button",
    className: styles$1.textBtn,
    onClick: function onClick() {
      return setVisible(true);
    }
  }, "\u500D\u901F")), fullscreen && React.createElement("button", {
    type: "button",
    onClick: exitFullscreen
  }, React.createElement(antd.Icon, {
    type: "fullscreen-exit"
  })), !fullscreen && React.createElement("button", {
    type: "button",
    onClick: requestFullscreen
  }, React.createElement(antd.Icon, {
    type: "fullscreen"
  })))), loading && !playerMsg && React.createElement("div", {
    className: styles$1.loading
  }, React.createElement(antd.Icon, {
    type: "loading"
  })), playerMsg && React.createElement("div", {
    className: styles$1.playerMsg
  }, playerMsg.type, ": ", playerMsg.detail));
});
ReactPlayerSkin.propTypes = {
  controls: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  buffered: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  changeCurrentTime: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  playbackRate: PropTypes.number.isRequired,
  changePlaybackRate: PropTypes.func,
  fullscreen: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
  onMutedClick: PropTypes.func,
  changeVolume: PropTypes.func,
  onPiPClick: PropTypes.func,
  requestFullscreen: PropTypes.func,
  exitFullscreen: PropTypes.func,
  playerMsg: PropTypes.object
};
ReactPlayerSkin.defaultProps = {
  buffered: null,
  onPlayClick: function onPlayClick() {},
  onPauseClick: function onPauseClick() {},
  onMutedClick: function onMutedClick() {},
  changeVolume: function changeVolume() {},
  onPiPClick: function onPiPClick() {},
  requestFullscreen: function requestFullscreen() {},
  exitFullscreen: function exitFullscreen() {},
  changePlaybackRate: function changePlaybackRate() {},
  playerMsg: null
};

var css$2 = ".index-module_reactPlayer__2dzH- {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  color: #fff;\n}\n.index-module_video__MtVT_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n}\n.index-module_videoMask__1SpT_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n}\n.index-module_hiddenVideoMask__1YqvS {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: 0;\n  background: transparent;\n}\n";
var styles$2 = {"reactPlayer":"index-module_reactPlayer__2dzH-","video":"index-module_video__MtVT_","videoMask":"index-module_videoMask__1SpT_","hiddenVideoMask":"index-module_hiddenVideoMask__1YqvS"};
styleInject(css$2);

var noop = function noop() {};

var useVideo = (function (props, getVideoElement, getPlayerElement) {
  var live = props.live,
      src = props.src,
      currentTimeProp = props.currentTime,
      mutedProp = props.muted,
      volumeProp = props.volume,
      onCanPlay = props.onCanPlay,
      onDurationChange = props.onDurationChange,
      onTimeUpdate = props.onTimeUpdate,
      onProgress = props.onProgress,
      onPause = props.onPause,
      onPlay = props.onPlay,
      onPlaying = props.onPlaying,
      onEnded = props.onEnded,
      onSeeked = props.onSeeked,
      onSeeking = props.onSeeking,
      onCanPlayThrough = props.onCanPlayThrough,
      onWaiting = props.onWaiting,
      onVolumeChange = props.onVolumeChange,
      onRateChange = props.onRateChange;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      paused = _React$useState4[0],
      setPaused = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      ended = _React$useState6[0],
      setEnded = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      seeking = _React$useState8[0],
      setSeeking = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      waiting = _React$useState10[0],
      setWaiting = _React$useState10[1];

  var _React$useState11 = React.useState(live ? -1 : 0),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      duration = _React$useState12[0],
      setDuration = _React$useState12[1];

  var _React$useState13 = React.useState(0),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      currentTime = _React$useState14[0],
      setCurrentTime = _React$useState14[1];

  var _React$useState15 = React.useState(null),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      buffered = _React$useState16[0],
      setBuffered = _React$useState16[1];

  var _React$useState17 = React.useState(props.muted),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      muted = _React$useState18[0],
      setMuted = _React$useState18[1];

  var _React$useState19 = React.useState(volumeProp),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      volume = _React$useState20[0],
      setVolume = _React$useState20[1];

  var _React$useState21 = React.useState(1),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      playbackRate = _React$useState22[0],
      setPlaybackRate = _React$useState22[1];

  React.useEffect(function () {
    if (!src) {
      return noop;
    }

    setLoading(true);
    setPaused(false);
    setEnded(false);
    setSeeking(false);
    setWaiting(false);
    setDuration(live ? -1 : 0);
    setCurrentTime(0);
    setBuffered(null);
    return function () {
      setLoading(false);
      setPaused(false);
      setEnded(false);
      setSeeking(false);
      setWaiting(false);
      setDuration(live ? -1 : 0);
      setCurrentTime(0);
      setBuffered(null);
    };
  }, [src, live]);
  var onVideoCanPlay = React.useCallback(function (e) {
    setLoading(false);
    setWaiting(false);
    onCanPlay(e);
  }, [onCanPlay]);
  var onVideoDurationChange = React.useCallback(function (e) {
    if (!live) {
      setDuration(e.target.duration);
    }

    onDurationChange(e);
  }, [live, onDurationChange]);
  var onVideoTimeUpdate = React.useCallback(function (e) {
    setCurrentTime(e.target.currentTime);
    onTimeUpdate(e);
  }, [onTimeUpdate]);
  var onVideoProgress = React.useCallback(function (e) {
    setBuffered(e.target.buffered);
    onProgress(e);
  }, [onProgress]);
  var onVideoPause = React.useCallback(function (e) {
    setPaused(true);
    onPause(e);
  }, [onPause]);
  var onVideoPlay = React.useCallback(function (e) {
    setPaused(false);
    setEnded(false);
    onPlay(e);
  }, [onPlay]);
  var onVideoPlaying = React.useCallback(function (e) {
    setPaused(false);
    setEnded(false);
    onPlaying(e);
  }, [onPlaying]);
  var onVideoEnded = React.useCallback(function (e) {
    setEnded(true);
    onEnded(e);
  }, [onEnded]);
  var onVideoSeeked = React.useCallback(function (e) {
    setSeeking(false);
    onSeeked(e);
  }, [onSeeked]);
  var onVideoSeeking = React.useCallback(function (e) {
    setSeeking(true);
    onSeeking(e);
  }, [onSeeking]);
  var onVideoCanPlayThrough = React.useCallback(function (e) {
    setWaiting(false);
    onCanPlayThrough(e);
  }, [onCanPlayThrough]);
  var onVideoWaiting = React.useCallback(function (e) {
    setWaiting(true);
    onWaiting(e);
  }, [onWaiting]);
  var onVideoVolumeChange = React.useCallback(function (e) {
    var v = e.target.volume;
    var m = 0 === v ? true : e.target.muted;
    setVolume(v);
    setMuted(m);
    onVolumeChange(e);
  }, [onVolumeChange]);
  var onVideoRateChange = React.useCallback(function (e) {
    setPlaybackRate(e.target.playbackRate);
    onRateChange(e);
  }, [onRateChange]);
  React.useEffect(function () {
    setCurrentTime(currentTimeProp);
    return noop;
  }, [currentTimeProp]);
  React.useEffect(function () {
    setMuted(mutedProp);
    return noop;
  }, [mutedProp]);
  React.useEffect(function () {
    setVolume(volumeProp);
    return noop;
  }, [volumeProp]);
  var changeCurrentTime = React.useCallback(function (t) {
    var el = getVideoElement();

    if (el) {
      el.currentTime = t;
    }

    setCurrentTime(t);
  }, [getVideoElement]);
  var onPauseClick = React.useCallback(function (t) {
    var el = getVideoElement();

    if (el) {
      el.pause();
    }

    setPaused(true);
  }, [getVideoElement]);
  var onPlayClick = React.useCallback(function (t) {
    var el = getVideoElement();

    if (el) {
      if (ended) {
        el.currentTime = 0;
      }

      el.play();
    }

    setPaused(true);
  }, [getVideoElement, ended]);
  var onMutedClick = React.useCallback(function (e) {
    var el = getVideoElement();

    if (el) {
      el.muted = !muted;

      if (0 === volume && muted) {
        el.volume = 1;
      }
    }
  }, [getVideoElement, muted, volume]);
  var changeVolume = React.useCallback(function (v) {
    var el = getVideoElement();

    if (el) {
      el.volume = v;
    }
  }, [getVideoElement]);
  var onPiPClick = React.useCallback(function (v) {
    var el = getVideoElement();

    if (el) {
      el.requestPictureInPicture();
    }
  }, [getVideoElement]);
  var changePlaybackRate = React.useCallback(function (r) {
    var el = getVideoElement();

    if (el) {
      el.playbackRate = r;
    }
  }, [getVideoElement]);
  return {
    loading: loading,
    paused: paused,
    ended: ended,
    seeking: seeking,
    waiting: waiting,
    duration: duration,
    currentTime: currentTime,
    buffered: buffered,
    muted: muted,
    volume: volume,
    playbackRate: playbackRate,
    mediaEvents: {
      onCanPlay: onVideoCanPlay,
      onDurationChange: onVideoDurationChange,
      onTimeUpdate: onVideoTimeUpdate,
      onProgress: onVideoProgress,
      onPause: onVideoPause,
      onPlay: onVideoPlay,
      onPlaying: onVideoPlaying,
      onEnded: onVideoEnded,
      onSeeked: onVideoSeeked,
      onSeeking: onVideoSeeking,
      onCanPlayThrough: onVideoCanPlayThrough,
      onWaiting: onVideoWaiting,
      onVolumeChange: onVideoVolumeChange,
      onRateChange: onVideoRateChange,
      onEmptied: props.onEmptied,
      onEncrypted: props.onEncrypted,
      onError: props.onError,
      onLoadedData: props.onLoadedData,
      onLoadedMetadata: props.onLoadedMetadata,
      onLoadStart: props.onLoadStart,
      onStalled: props.onStalled,
      onSuspend: props.onSuspend,
      onAbort: props.onAbort
    },
    changeCurrentTime: changeCurrentTime,
    onPauseClick: onPauseClick,
    onPlayClick: onPlayClick,
    onMutedClick: onMutedClick,
    changeVolume: changeVolume,
    onPiPClick: onPiPClick,
    changePlaybackRate: changePlaybackRate
  };
});

var useHlsjs = (function (_ref, getVideoElement) {
  var src = _ref.src,
      config = _ref.config;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hlsPlayer = _React$useState2[0],
      setHlsPlayer = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      playerMsg = _React$useState4[0],
      setPlayerMsg = _React$useState4[1];

  React.useEffect(function () {
    var el = getVideoElement();

    if (!el || !src) {
      setHlsPlayer(null);
      return function () {};
    }

    var hls = new Hls(Object.assign({
      debug: false,
      enableWorker: false
    }, config));
    hls.loadSource(src);
    setHlsPlayer(hls);
    return function () {
      setHlsPlayer(null);
    };
  }, [getVideoElement, src, config]);
  React.useEffect(function () {
    if (!hlsPlayer) {
      return function () {};
    }

    var el = getVideoElement();

    if (el) {
      hlsPlayer.attachMedia(el);
      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function () {
        return el.play();
      });
    }

    return function () {
      try {
        hlsPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, hlsPlayer]);
  var onPlayerError = React.useCallback(function (e, info) {
    if (info && info.fatal) {
      setPlayerMsg({
        type: info.type,
        detail: info.details
      });
    }
  }, []);
  React.useEffect(function () {
    if (!hlsPlayer) {
      setPlayerMsg(null);
      return function () {};
    }

    hlsPlayer.on(Hls.Events.ERROR, onPlayerError);
    return function () {
      try {
        hlsPlayer.off(Hls.Events.ERROR);
      } catch (errMsg) {}

      setPlayerMsg(null);
    };
  }, [hlsPlayer, onPlayerError]);
  return playerMsg;
});

//   switch (type) {
//     case flvjs.Events.ErrorTypes:
//       return '网络错误';
//     case flvjs.Events.MEDIA_ERROR:
//       return '媒体错误';
//     default:
//       return '未知错误';
//   }
// };
// const parseErrorDetail = detail => {
//   switch (detail) {
//     case flvjs.ErrorDetails.NETWORK_EXCEPTION:
//       return '异常';
//     case flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID:
//       return 'NETWORK_STATUS_CODE_INVALID';
//     case flvjs.ErrorDetails.NETWORK_TIMEOUT:
//       return '超时';
//     case flvjs.ErrorDetails.NETWORK_UNRECOVERABLE_EARLY_EOF:
//       return 'NETWORK_UNRECOVERABLE_EARLY_EOF';
//     case flvjs.ErrorDetails.MEDIA_MSE_ERROR:
//       return '解码异常';
//     case flvjs.ErrorDetails.MEDIA_FORMAT_ERROR:
//       return '媒体流参数异常';
//     case flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED:
//       return '编码格式不支持';
//     case flvjs.ErrorDetails.MEDIA_CODEC_UNSUPPORTED:
//       return '音频或视频编码格式不支持';
//     default:
//       return '网络异常';
//   }
// };
// const noop = () => {};

var useFlvjs = (function (_ref, getVideoElement) {
  var src = _ref.src,
      config = _ref.config;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      flvPlayer = _React$useState2[0],
      setFlvPlayer = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      playerMsg = _React$useState4[0],
      setPlayerMsg = _React$useState4[1];

  React.useEffect(function () {
    var el = getVideoElement();

    if (!el || !src) {
      setFlvPlayer(null);
      return function () {};
    }

    setFlvPlayer(flvjs.createPlayer({
      isLive: true,
      type: 'flv',
      url: src
    }, _objectSpread({}, config)));
    return function () {
      setFlvPlayer(null);
    };
  }, [getVideoElement, src, config]);
  React.useEffect(function () {
    if (!flvPlayer) {
      return function () {};
    }

    var el = getVideoElement();

    if (el) {
      flvPlayer.attachMediaElement(el);
      flvPlayer.load();
      flvPlayer.play();
    }

    return function () {
      try {
        flvPlayer.pause();
      } catch (errMsg) {}

      try {
        flvPlayer.unload();
      } catch (errMsg) {}

      try {
        flvPlayer.detachMediaElement();
      } catch (errMsg) {}

      try {
        flvPlayer.destroy();
      } catch (errMsg) {}
    };
  }, [getVideoElement, flvPlayer]);
  var onPlayerError = React.useCallback(function (type, detail) {
    setPlayerMsg({
      type: type,
      detail: detail
    });
  }, []);
  React.useEffect(function () {
    if (!flvPlayer) {
      return function () {};
    }

    flvPlayer.on(flvjs.Events.ERROR, onPlayerError);
    return function () {
      try {
        flvPlayer.off(flvjs.Events.ERROR);
      } catch (errMsg) {}
    };
  }, [flvPlayer, onPlayerError]);
  return playerMsg;
});

var useNative = (function (_ref, getVideoElement) {
  var src = _ref.src;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loaded = _React$useState2[0],
      setLoaded = _React$useState2[1];

  React.useEffect(function () {
    var el = getVideoElement();

    if (!el || !src) {
      return function () {};
    }

    el.src = src;
    el.load();
    el.play();
    return function () {
      el.pause();
      el.src = '';

      try {
        el.load();
      } catch (errMsg) {}
    };
  }, [getVideoElement, src]);
  var onDocumentClick = React.useCallback(function () {
    var el = getVideoElement();

    if (!el) {
      setLoaded(false);
      return function () {};
    }

    el.src = '';
    el.load();
    setLoaded(true);
  }, [getVideoElement]);
  React.useEffect(function () {
    document.addEventListener('click', onDocumentClick);
    return function () {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [onDocumentClick]);
  React.useEffect(function () {
    if (loaded) {
      document.removeEventListener('click', onDocumentClick);
    }

    return function () {};
  }, [loaded, onDocumentClick]);
  return null;
});

var useVideoFullscreen = (function (_ref, getVideoElement, getPlayerElement) {
  var x5playsinline = _ref.x5playsinline,
      onX5VideoFullscreenChange = _ref.onX5VideoFullscreenChange;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      fullscreen = _React$useState2[0],
      setFullscreen = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      x5videofullscreen = _React$useState4[0],
      setX5videofullscreen = _React$useState4[1];

  var requestFullscreen = React.useCallback(function (v) {
    var el = getPlayerElement();

    if (el && el.requestFullscreen) {
      el.requestFullscreen();
      return;
    } else if (x5playsinline) {
      if (x5videofullscreen) {
        setFullscreen(true);
        return;
      }

      var videoEl = getVideoElement();

      if (videoEl && videoEl.play) {
        videoEl.play();
      } else {
        console.error('全屏失败');
      }
    } else {
      console.error('全屏失败');
    }
  }, [getVideoElement, getPlayerElement, x5playsinline, x5videofullscreen]);
  var exitFullscreen = React.useCallback(function (v) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (x5playsinline) {
      setFullscreen(false);
    } else {
      setFullscreen(false);
    }
  }, [x5playsinline]);
  var onFullscreenChange = React.useCallback(function (v) {
    var el = getPlayerElement();
    setFullscreen(!!el && document.fullscreenElement === el);
  }, [getPlayerElement]);
  React.useEffect(function () {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return function () {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [onFullscreenChange]);
  var onResize = React.useCallback(function () {
    var el = getVideoElement();

    if (el) {
      el.style.width = "".concat(global.innerWidth, "px");
      el.style.height = "".concat(global.innerHeight, "px");
    }
  }, [getVideoElement]);
  React.useEffect(function () {
    if (!x5playsinline) {
      return function () {};
    }

    global.addEventListener('resize', onResize);
    return function () {
      global.removeEventListener('resize', onResize);
    };
  }, [x5playsinline, onResize]);
  var onx5videoenterfullscreen = React.useCallback(function () {
    // alert('onx5videoenterfullscreen');
    setX5videofullscreen(true);
  }, []);
  var onx5videoexitfullscreen = React.useCallback(function () {
    // alert('onx5videoexitfullscreen');
    setX5videofullscreen(false);
  }, []);
  React.useEffect(function () {
    if (!x5playsinline) {
      return function () {};
    }

    var el = getVideoElement();

    if (!el) {
      return function () {};
    }

    el.addEventListener('x5videoenterfullscreen', onx5videoenterfullscreen);
    el.addEventListener('x5videoexitfullscreen', onx5videoexitfullscreen);
    return function () {
      el.removeEventListener('x5videoenterfullscreen', onx5videoenterfullscreen);
      el.removeEventListener('x5videoexitfullscreen', onx5videoexitfullscreen);
    };
  }, [x5playsinline, getVideoElement, onx5videoenterfullscreen, onx5videoexitfullscreen]);
  React.useEffect(function () {
    if (!x5playsinline) {
      return function () {};
    }

    onX5VideoFullscreenChange({
      x5videofullscreen: x5videofullscreen,
      fullscreen: fullscreen
    });
    return function () {};
  }, [x5playsinline, x5videofullscreen, fullscreen, onX5VideoFullscreenChange]);
  return {
    fullscreen: fullscreen,
    x5videofullscreen: x5videofullscreen,
    requestFullscreen: requestFullscreen,
    exitFullscreen: exitFullscreen
  };
});

var noop$1 = function noop() {};

var getRenderHooks = function getRenderHooks(kernel) {
  switch (kernel) {
    case 'native':
      return useNative;

    case 'hlsjs':
      return useHlsjs;

    case 'flvjs':
      return useFlvjs;

    default:
      return noop$1;
  }
};

var ReactPlayer = function ReactPlayer(props) {
  var videoRef = React.useRef(null);
  var playerRef = React.useRef(null);
  var getVideoElement = React.useCallback(function () {
    return videoRef && videoRef.current;
  }, []);
  var getPlayerElement = React.useCallback(function () {
    return playerRef && playerRef.current;
  }, []);

  var _useVideo = useVideo(props, getVideoElement),
      muted = _useVideo.muted,
      mediaEvents = _useVideo.mediaEvents,
      videoProps = _objectWithoutProperties(_useVideo, ["muted", "mediaEvents"]);

  var playerMsg = getRenderHooks(props.kernel)(props, getVideoElement);
  var fullscreenProps = useVideoFullscreen(props, getVideoElement, getPlayerElement);
  var videoStyles = {};

  if (fullscreenProps.x5videofullscreen) {
    videoStyles.objectPosition = fullscreenProps.fullscreen ? 'center center' : props.objectPosition;
  }

  return React.createElement("div", {
    className: styles$2.reactPlayer,
    ref: playerRef
  }, React.createElement("video", _extends({
    className: styles$2.video,
    ref: videoRef,
    muted: muted,
    loop: props.loop
  }, mediaEvents, {
    "webkit-playsinline": true,
    playsInline: true,
    "x5-playsinline": true,
    "x5-video-player-type": "h5",
    "x5-video-player-fullscreen": "true",
    "x5-video-orientation": "landscape|portrait",
    style: videoStyles
  })), React.createElement("div", {
    className: props.src ? styles$2.hiddenVideoMask : styles$2.videoMask
  }), React.createElement(ReactPlayerSkin, _extends({
    src: props.src,
    controls: props.controls,
    muted: muted
  }, videoProps, fullscreenProps, {
    playerMsg: playerMsg
  })));
};

ReactPlayer.propTypes = {
  kernel: PropTypes.string,
  live: PropTypes.bool,
  x5playsinline: PropTypes.bool,
  src: PropTypes.string,
  type: PropTypes.string,
  config: PropTypes.object,
  controls: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  autoPlay: PropTypes.bool,
  currentTime: PropTypes.number,
  loop: PropTypes.bool,
  onCanPlay: PropTypes.func,
  onDurationChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeked: PropTypes.func,
  onSeeking: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEmptied: PropTypes.func,
  onEncrypted: PropTypes.func,
  onError: PropTypes.func,
  onLoadedData: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadStart: PropTypes.func,
  onProgress: PropTypes.func,
  onRateChange: PropTypes.func,
  onStalled: PropTypes.func,
  onSuspend: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onWaiting: PropTypes.func,
  onAbort: PropTypes.func,
  objectPosition: PropTypes.string,
  onX5VideoFullscreenChange: PropTypes.func
};
ReactPlayer.defaultProps = {
  kernel: 'hlsjs',
  live: false,
  x5playsinline: false,
  src: '',
  type: 'application/x-mpegURL',
  config: {
    debug: false,
    enableWorker: false
  },
  controls: true,
  muted: false,
  volume: 1,
  autoPlay: true,
  currentTime: 0,
  loop: false,
  onCanPlay: noop$1,
  onDurationChange: noop$1,
  onTimeUpdate: noop$1,
  onPause: noop$1,
  onPlay: noop$1,
  onPlaying: noop$1,
  onEnded: noop$1,
  onSeeked: noop$1,
  onSeeking: noop$1,
  onCanPlayThrough: noop$1,
  onEmptied: noop$1,
  onEncrypted: noop$1,
  onError: noop$1,
  onLoadedData: noop$1,
  onLoadedMetadata: noop$1,
  onLoadStart: noop$1,
  onProgress: noop$1,
  onRateChange: noop$1,
  onStalled: noop$1,
  onSuspend: noop$1,
  onVolumeChange: noop$1,
  onWaiting: noop$1,
  onAbort: noop$1,
  onX5VideoFullscreenChange: noop$1,
  objectPosition: 'center center'
};

var css$3 = ".index-module_grindPlayer__1UOcH {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  min-width: 400px;\n  min-height: 300px;\n  overflow: hidden;\n  background: #000;\n}\n";
var styles$3 = {"grindPlayer":"index-module_grindPlayer__1UOcH"};
styleInject(css$3);

var GrindPlayer = function GrindPlayer(_ref) {
  var live = _ref.live,
      src = _ref.src,
      type = _ref.type,
      grindPlayerSwf = _ref.grindPlayerSwf,
      flashlsOSMFSwf = _ref.flashlsOSMFSwf;

  if (!src) {
    return React.createElement("div", {
      className: styles$3.grindPlayer
    });
  }

  var flashVars = {
    src: src,
    autoPlay: true,
    bufferTime: 0.5,
    streamType: live ? 'live' : 'recorded'
  };

  if ('application/x-mpegURL' === type) {
    flashVars.plugin_hls = flashlsOSMFSwf;
  }

  return React.createElement("div", {
    className: styles$3.grindPlayer
  }, React.createElement(ReactSWF, {
    src: grindPlayerSwf,
    width: "100%",
    height: "100%",
    wmode: "opaque",
    allowFullScreen: true,
    allowScriptAccess: "always",
    bgcolor: "#000000",
    flashVars: flashVars
  }));
};

GrindPlayer.propTypes = {
  live: PropTypes.bool,
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  grindPlayerSwf: PropTypes.string,
  flashlsOSMFSwf: PropTypes.string
};
GrindPlayer.defaultProp = {
  live: true,
  grindPlayerSwf: 'http://unpkg.com/reactjs-player/dist/GrindPlayer.swf',
  flashlsOSMFSwf: 'http://unpkg.com/reactjs-player/dist/flashlsOSMF.swf'
};

ReactPlayer.GrindPlayer = GrindPlayer;

module.exports = ReactPlayer;
//# sourceMappingURL=index.js.map
