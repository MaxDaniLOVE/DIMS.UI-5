import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ onClick, children, isFormValid }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${isFormValid ? 'success' : 'danger'}`}
      type='button'
      disabled={!isFormValid}
    >
      {children}
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

export default SubmitButton;
