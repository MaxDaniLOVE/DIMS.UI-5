import React from 'react';
import PropTypes from 'prop-types';

const SuccessButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className='btn btn-success' type='button'>
      {children}
    </button>
  );
};

SuccessButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default SuccessButton;
