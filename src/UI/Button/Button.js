import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, children, customClass, customStyles }) => {
  return (
    <button className={`custom-btn ${customClass}`} type={type} style={customStyles}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  customClass: '',
  customStyles: {},
};

Button.propTypes = {
  type: PropTypes.string,
  customClass: PropTypes.string,
  children: PropTypes.element.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.any),
};

export default Button;
