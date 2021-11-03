import React from 'react';
import PropTypes from 'prop-types';
import useFlvjs from './useFlvjs';

const Flvjs = (props) => {
  // console.log(`Flvjs`);
  useFlvjs(props);
  return null;
};

Flvjs.propTypes = {
  getVideoElement: PropTypes.func.isRequired,
  src: PropTypes.string,
  config: PropTypes.object,
  onMsgChange: PropTypes.func.isRequired,
};

Flvjs.defaultProps = {
  src: '',
  config: null,
};

export default React.memo(
  Flvjs,
  (p, n) =>
    p.getVideoElement === n.getVideoElement &&
    p.src === n.src &&
    p.config === n.config &&
    p.onMsgChange === n.onMsgChange,
);
