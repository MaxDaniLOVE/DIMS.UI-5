import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SuccessButton from './SuccessButton';
import { AddUserIcon } from '../../assets/icons';

const AddUserButton = ({ onClick, role }) =>
  role === 'ADMIN' && (
    <SuccessButton onClick={onClick}>
      <AddUserIcon />
    </SuccessButton>
  );

AddUserButton.propTypes = {
  role: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  auth: {
    user: { role },
  },
}) => {
  return { role };
};

export default connect(mapStateToProps, null)(AddUserButton);
