import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledAlert } from 'reactstrap';

const DangerAlert = ({ children }) => <UncontrolledAlert color='danger'>{children}</UncontrolledAlert>;

DangerAlert.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DangerAlert;
