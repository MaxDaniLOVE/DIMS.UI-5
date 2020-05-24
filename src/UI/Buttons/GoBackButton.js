import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const GoBackButton = ({ onClick }) => (
  <Button onClick={onClick} className='btn-return'>
    Back
  </Button>
);

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
