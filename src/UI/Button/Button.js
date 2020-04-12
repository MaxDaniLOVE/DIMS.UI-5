import React from 'react';
import './Button.scss';

const Button = ({ type = 'button', children, customClass = '' }) => {
  return (
    <button className={`custom-btn ${customClass}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
