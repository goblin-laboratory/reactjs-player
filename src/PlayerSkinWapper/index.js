import React from 'react';
import PlayerContext from '../PlayerContext';
import PlayerSkin from '../PlayerSkin';

const PlayerSkinWapper = () => {
  const props = React.useContext(PlayerContext);
  return <PlayerSkin {...props} />;
};

export default PlayerSkinWapper;
