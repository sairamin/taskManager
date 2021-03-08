import React from "react";
import PropTypes from "prop-types";
import { AiOutlineEllipsis } from "react-icons/ai";

// Lodash
import _noop from "lodash/noop";

// Components
import Menu from "../../../../../../../../components/molecules/menu";
import Dropdown from "../../../../../../../../components/molecules/dropdown";

// Styles
import styles from './listOptions.module.scss';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">Add Task...</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">Copy List...</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Archive This List</Menu.Item>
  </Menu>
);

const ListOptions = (props) => {
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className={styles.ellipsis} onClick={(e) => e.preventDefault()}>
        <AiOutlineEllipsis />
      </a>
    </Dropdown>
  );
};

ListOptions.propTypes = {
  onAction: PropTypes.func,
};

ListOptions.defaultProps = {
  onAction: _noop,
};

export default ListOptions;
