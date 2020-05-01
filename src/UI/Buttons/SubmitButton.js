import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SubmitButton = ({ onClick, children, isFormValid }) => {
  return (
    <Button onClick={onClick} color={isFormValid ? 'success' : 'danger'} disabled={!isFormValid}>
      {children}
    </Button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

export default SubmitButton;
