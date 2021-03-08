import React from "react";
import PropTypes from "prop-types";

// Lodash
import _noop from 'lodash/noop';

// Styles
import styles from './header.module.scss';

const Header = ({ title, onClick }) => {
  return (
    <div className={styles.container}>
      <a className={styles.title} onClick={onClick}>{title}</a>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Header.defaultProps = {
  title: "Task Manager",
  onClick: _noop,
};

export default Header;
