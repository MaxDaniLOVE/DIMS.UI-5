import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, children, customClass }) => {
  return (
    <button className={`custom-btn ${customClass}`} type={type}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  customClass: '',
};

Button.propTypes = {
  type: PropTypes.string,
  customClass: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Button;
