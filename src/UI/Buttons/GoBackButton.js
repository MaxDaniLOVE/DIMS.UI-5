import React from 'react';
import PropTypes from 'prop-types';

const GoBackButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='btn btn-return' type='button'>
      Back to grid
    </button>
  );
};

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
