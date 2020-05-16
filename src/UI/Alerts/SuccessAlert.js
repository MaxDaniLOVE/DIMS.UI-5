import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledAlert } from 'reactstrap';

const SuccessAlert = ({ children }) => <UncontrolledAlert color='success'>{children}</UncontrolledAlert>;

SuccessAlert.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SuccessAlert;
