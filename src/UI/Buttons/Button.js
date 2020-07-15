import React from 'react';
import PropTypes from 'prop-types';
import { Button as ReactStrapBtn } from 'reactstrap';
import './button.scss';

const Button = ({ onClick, children, newClassName, id }) => {
  return (
    <ReactStrapBtn onClick={onClick} className={`btn ${newClassName}`} id={id}>
      {children}
    </ReactStrapBtn>
  );
};

Button.defaultProps = {
  newClassName: '',
  onClick: () => {},
  id: '',
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  newClassName: PropTypes.string,
  id: PropTypes.string,
};

export default Button;
