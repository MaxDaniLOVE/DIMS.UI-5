import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const DangerAlert = ({ children, isOpen, toggle }) => (
  <Alert color='danger' isOpen={isOpen} toggle={toggle}>
    {children}
  </Alert>
);

DangerAlert.defaultProps = {
  children: '',
};

DangerAlert.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.string,
};

export default DangerAlert;
