import React from 'react';
import PropTypes from 'prop-types';
import useFlvjs from '@reactjs-player/use-flvjs';

const Flvjs = props => {
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

export default React.memo(Flvjs);
