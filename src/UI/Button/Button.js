import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, type, children, customClass, customStyles }) => {
  return (
    <button onClick={onClick} className={`custom-btn ${customClass}`} type={type} style={customStyles}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  customClass: '',
  customStyles: {},
  onClick: () => null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  customClass: PropTypes.string,
  children: PropTypes.element.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.any),
};

export default Button;
