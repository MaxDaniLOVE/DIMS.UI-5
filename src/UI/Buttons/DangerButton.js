import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const DangerButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} color='danger'>
      {children}
    </Button>
  );
};

DangerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default DangerButton;
