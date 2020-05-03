import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const GoBackButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className='btn-return'>
      Back to grid
    </Button>
  );
};

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
