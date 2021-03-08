import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Components
import { Button as AntdButton } from "antd";

// Constants
import { BUTTON_VIEWS } from "./button.constants";

// Styles
import styles from './button.module.scss';

function Button(props) {
  const {
    label,
    view,
    className,
    children,
    ...rest
  } = props;
  return (
    <AntdButton
      className={cx(styles.button, className)}
      type={view}
      {...rest}
    >
      {label || children}
    </AntdButton>
  );
}

Button.propTypes = {
  view: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.elementType,
};

Button.defaultProps = {
  view: BUTTON_VIEWS.PRIMARY,
  className: undefined,
  label: '',
};

export default Button;
