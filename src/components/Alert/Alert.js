import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DangerAlert, SuccessAlert } from '../../UI/Alerts';

export default class Alert extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    const {
      alert: { message, type },
    } = this.props;
    if (message && type) {
      this.onOpenAlert();
      this.timer = setTimeout(this.onCloseAlert, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onOpenAlert = () => {
    this.setState({ isOpen: true });
  };

  onCloseAlert = () => {
    const {
      alert: { id },
      removeAlert,
    } = this.props;
    this.setState({ isOpen: false });
    removeAlert(id);
  };

  render() {
    const { isOpen } = this.state;
    const {
      alert: { type, message },
    } = this.props;
    const alerts = {
      ERROR: (
        <DangerAlert isOpen={isOpen} toggle={this.onCloseAlert}>
          {message}
        </DangerAlert>
      ),
      SUCCESS: (
        <SuccessAlert isOpen={isOpen} toggle={this.onCloseAlert}>
          {message}
        </SuccessAlert>
      ),
    };
    return alerts[type] || null;
  }
}

Alert.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
  removeAlert: PropTypes.func.isRequired,
};
