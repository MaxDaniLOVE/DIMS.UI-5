import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className='btn' type='button'>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
