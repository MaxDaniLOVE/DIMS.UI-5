import React from 'react';
import PropTypes from 'prop-types';

const ChangePassButton = ({ onClick, children }) => (
  <button onClick={onClick} className='change-pass-btn' type='button'>
    {children}
  </button>
);

ChangePassButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChangePassButton;
