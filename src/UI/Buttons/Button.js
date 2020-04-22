import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, children, newClassName }) => {
  return (
    <button onClick={onClick} className={`btn ${newClassName}`} type='button'>
      {children}
    </button>
  );
};

Button.defaultProps = {
  newClassName: '',
  onClick: () => {},
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  newClassName: PropTypes.string,
};

export default Button;
