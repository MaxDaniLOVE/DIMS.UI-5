import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const SuccessAlert = ({ children, isOpen, toggle }) => (
  <Alert color='success' isOpen={isOpen} toggle={toggle}>
    <>
      {children}
      <div className='alert-progress-bar success-progress' />
    </>
  </Alert>
);

SuccessAlert.defaultProps = {
  children: '',
};

SuccessAlert.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.string,
};

export default SuccessAlert;
