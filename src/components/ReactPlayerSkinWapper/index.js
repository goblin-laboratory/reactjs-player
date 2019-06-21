import React from 'react';
import ReactPlayerContext from '../ReactPlayerContext';
import ReactPlayerSkin from '../ReactPlayerSkin';

const ReactPlayerSkinWapper = () => {
  const props = React.useContext(ReactPlayerContext);
  return <ReactPlayerSkin {...props} />;
};

export default ReactPlayerSkinWapper;
