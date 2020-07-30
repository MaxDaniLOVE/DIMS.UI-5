import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Alert';
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
    return (
      <div className='alerts-container'>
        {alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} />
        ))}
      </div>
    );
  }
}

AlertsContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

const mapStateToProps = ({ data: { alerts } }) => ({ alerts });

export default connect(mapStateToProps)(AlertsContainer);
