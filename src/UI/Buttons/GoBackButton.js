import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const GoBackButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} newClassName='btn-return'>
      Back to grid
    </Button>
  );
};

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
