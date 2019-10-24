import React from 'react';
import PropTypes from 'prop-types';
import useHlsjs from '@reactjs-player/use-hlsjs';

const Hlsjs = props => {
  useHlsjs(props);
  return null;
};

Hlsjs.propTypes = {
  getVideoElement: PropTypes.func.isRequired,
  src: PropTypes.string,
  config: PropTypes.object,
  onMsgChange: PropTypes.func.isRequired,
};

Hlsjs.defaultProps = {
  src: '',
  config: null,
};

export default React.memo(Hlsjs);
