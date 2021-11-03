import React from 'react';

const initialState = {
  controlsHovering: false,
  sliding: false,
  value: 0,
  tooltip: 0,
  hiding: false,
  rateMenuVisible: false,
};

const reducer = (state, action) => {
  if ('reset' === action.type) {
    return { ...initialState, ...action.payload };
  }
  return { ...state, ...action.payload };
};

export default () => {
  const [{ controlsHovering, hiding, sliding, value, tooltip, rateMenuVisible }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );
  // const ref = React.useRef({});

  React.useEffect(() => {
    // console.log('usePlayerSkin');
    return () => {
      dispatch({ type: 'reset' });
    };
  }, []);

  return {
    dispatch,
    controlsHovering,
    hiding,
    sliding,
    value,
    tooltip,
    rateMenuVisible,
  };
};
