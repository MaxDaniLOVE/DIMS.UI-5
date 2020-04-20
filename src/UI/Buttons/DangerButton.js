import React from 'react';
import PropTypes from 'prop-types';

const DangerButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className='btn btn-danger' type='button'>
      {children}
    </button>
  );
};

DangerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default DangerButton;
