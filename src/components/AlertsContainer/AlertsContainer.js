/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AlertItem from '../AlertItem';
import { removeAlert } from '../../store/actions';

import './alertsContainer.scss';

const AlertsContainer = ({ alerts, removeAlert }) => {
  return (
    <div className='alerts-container'>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} removeAlert={removeAlert} />
      ))}
    </div>
  );
};

AlertsContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { alerts } }) => ({ alerts });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeAlert }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsContainer);
