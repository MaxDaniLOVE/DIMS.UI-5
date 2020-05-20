import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useAlert from '../../hooks/useAlert';

const AlertsContainer = ({ alert }) => {
  const newAlert = useAlert(alert);
  return <div>{newAlert}</div>;
};

AlertsContainer.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ alert }) => ({ alert });

export default connect(mapStateToProps)(AlertsContainer);
