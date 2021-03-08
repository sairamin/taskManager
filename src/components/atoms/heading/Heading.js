import React from "react";
import PropTypes from "prop-types";

// Styles
import styles from "./heading.module.scss";

function Heading(props) {
  const { size, children, className, ...rest } = props;

  return (
    <div {...rest} className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}

Heading.propTypes = {
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: '',
};

export default Heading;
