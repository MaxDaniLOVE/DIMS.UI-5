import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const DangerButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} newClassName='btn-danger'>
      {children}
    </Button>
  );
};

DangerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default DangerButton;
