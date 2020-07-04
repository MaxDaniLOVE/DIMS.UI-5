import React from 'react';
import PropTypes from 'prop-types';
import SuccessButton from './SuccessButton';
import { AddUserIcon } from '../../assets/icons';

const AddUserButton = ({ onClick, isAdmin }) =>
  isAdmin && (
    <SuccessButton onClick={onClick}>
      <AddUserIcon />
    </SuccessButton>
  );

AddUserButton.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default AddUserButton;
