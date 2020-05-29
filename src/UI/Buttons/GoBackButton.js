import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { ReactComponent as GoBackIcon } from '../../assets/icons/cross.svg';

const GoBackButton = ({ onClick }) => (
  <Button onClick={onClick} className='btn-return'>
    <GoBackIcon />
  </Button>
);

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
