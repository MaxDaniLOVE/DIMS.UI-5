import React from 'react';
import PropTypes from 'prop-types';

const OutlineButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className='btn btn-outline' type='button'>
      {children}
    </button>
  );
};

OutlineButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default OutlineButton;
