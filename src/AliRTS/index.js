import React from 'react';
import PropTypes from 'prop-types';
import useAliRTS from './useAliRTS';

const AliRTS = (props) => {
  useAliRTS(props);
  return null;
};

AliRTS.propTypes = {
  getVideoElement: PropTypes.func.isRequired,
  src: PropTypes.string,
  config: PropTypes.object,
  onMsgChange: PropTypes.func.isRequired,
};

AliRTS.defaultProps = {
  src: '',
  config: null,
};

export default React.memo(AliRTS);
