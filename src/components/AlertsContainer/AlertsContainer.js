/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from '../Alert';
import { removeAlert } from '../../store/actions';

import './alertsContainer.scss';

class AlertsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { alerts } = nextProps;
    return {
      alerts,
    };
  }

  render() {
    const { alerts } = this.state;
    const { removeAlert } = this.props;
    return (
      <div className='alerts-container'>
        {alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} removeAlert={removeAlert} />
        ))}
      </div>
    );
  }
}

AlertsContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { alerts } }) => ({ alerts });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeAlert }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsContainer);
