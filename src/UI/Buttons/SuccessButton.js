import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SuccessButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} color='success'>
      {children}
    </Button>
  );
};

SuccessButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default SuccessButton;
