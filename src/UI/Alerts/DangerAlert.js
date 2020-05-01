import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const DangerAlert = ({ children, isOpen, toggle }) => (
  <Alert color='danger' isOpen={isOpen} toggle={toggle}>
    {children}
  </Alert>
);

DangerAlert.propTypes = {
  toggle: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default DangerAlert;
