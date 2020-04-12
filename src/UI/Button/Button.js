import React from 'react';
import './Button.scss';

const Button = ({ type = 'button', children }) => {
  return (
    <button className='custom-btn' type={type}>
      {children}
    </button>
  );
};

export default Button;
