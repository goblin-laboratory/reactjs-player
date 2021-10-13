import React from 'react';
import ReactPlayerContext from '../ReactPlayerContext';
import ReactPlayerSkin from '../ReactPlayerSkin';

const ReactPlayerSkinWapper = () => {
  const props = React.useContext(ReactPlayerContext);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ReactPlayerSkin {...props} />;
};

export default ReactPlayerSkinWapper;
