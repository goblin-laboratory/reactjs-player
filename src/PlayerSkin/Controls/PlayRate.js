import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';

import styles from './index.module.less';

const PlayRate = ({ live, playbackRate, changePlaybackRate, visible, dispatch }) => {
  const show = React.useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({ type: 'update', payload: { rateMenuVisible: true } });
    },
    [dispatch],
  );

  const hide = React.useCallback(() => dispatch({ type: 'update', payload: { rateMenuVisible: false } }), [dispatch]);

  const onMenuClick = React.useCallback(
    (e) => {
      changePlaybackRate(parseFloat(e.key, 10));
      dispatch({ type: 'update', payload: { rateMenuVisible: false } });
    },
    [changePlaybackRate, dispatch],
  );

  React.useEffect(() => {
    document.body.addEventListener('click', hide);
    return () => document.body.removeEventListener('click', hide);
  }, [hide]);

  if (live) {
    return null;
  }

  return (
    <Dropdown
      visible={visible}
      overlay={
        <Menu selectedKeys={[playbackRate.toString()]} onClick={onMenuClick}>
          <Menu.Item key="0.25">&nbsp;&nbsp;0.25 倍速&nbsp;&nbsp;</Menu.Item>
          <Menu.Item key="0.5">&nbsp;&nbsp;0.5 倍速&nbsp;&nbsp;</Menu.Item>
          <Menu.Item key="1">&nbsp;&nbsp;1 倍速&nbsp;&nbsp;</Menu.Item>
          <Menu.Item key="1.25">&nbsp;&nbsp;1.25 倍速&nbsp;&nbsp;</Menu.Item>
          <Menu.Item key="1.5">&nbsp;&nbsp;1.5 倍速&nbsp;&nbsp;</Menu.Item>
          <Menu.Item key="2">&nbsp;&nbsp;2 倍速&nbsp;&nbsp;</Menu.Item>
        </Menu>
      }
      placement="topRight"
      trigger={[]}
    >
      <button type="button" className={styles.textBtn} onClick={show}>
        倍速
      </button>
    </Dropdown>
  );
};

PlayRate.propTypes = {
  live: PropTypes.bool.isRequired,
  playbackRate: PropTypes.number.isRequired,
  changePlaybackRate: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  PlayRate,
  (p, n) =>
    p.live === n.live &&
    p.playbackRate === n.playbackRate &&
    p.changePlaybackRate === n.changePlaybackRate &&
    p.visible === n.visible &&
    p.dispatch === n.dispatch,
);
