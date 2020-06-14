import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { GoBackIcon } from '../../assets/icons';

const GoBackButton = ({ onClick }) => (
  <Button onClick={onClick} className='btn-return'>
    <GoBackIcon />
  </Button>
);

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
