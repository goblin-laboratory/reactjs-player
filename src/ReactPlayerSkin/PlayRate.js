import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';

import 'antd/lib/dropdown/style/index.css';
import styles from './index.module.less';

const PlayRate = ({ playbackRate, changePlaybackRate, visible, setVisible }) => {
  const showRateChangeMenu = React.useCallback(
    (e) => {
      e.stopPropagation();
      setVisible(true);
    },
    [setVisible],
  );

  const hideRateChangeMenu = React.useCallback(() => setVisible(false), [setVisible]);

  const onMenuClick = React.useCallback(
    (e) => {
      changePlaybackRate(parseFloat(e.key, 10));
      setVisible(false);
    },
    [changePlaybackRate, setVisible],
  );

  React.useEffect(() => {
    document.body.addEventListener('click', hideRateChangeMenu);
    return () => document.body.removeEventListener('click', hideRateChangeMenu);
  }, [hideRateChangeMenu]);

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
      <button type="button" className={styles.textBtn} onClick={showRateChangeMenu}>
        倍速
      </button>
    </Dropdown>
  );
};

PlayRate.propTypes = {
  playbackRate: PropTypes.number.isRequired,
  changePlaybackRate: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default React.memo(
  PlayRate,
  (p, n) =>
    p.playbackRate === n.playbackRate &&
    p.changePlaybackRate === n.changePlaybackRate &&
    p.visible === n.visible &&
    p.setVisible === n.setVisible,
);
