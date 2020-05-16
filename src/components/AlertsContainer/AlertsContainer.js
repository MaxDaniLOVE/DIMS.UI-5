import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DangerAlert, SuccessAlert } from '../../UI/Alerts';

const AlertsContainer = ({ alert: { message, type } }) => {
  const [isOpen, onSetIsOpen] = useState(false);
  const onCloseAlert = () => onSetIsOpen(false);
  const onOpenAlert = () => onSetIsOpen(true);
  useEffect(() => {
    if (message && type) {
      onOpenAlert();
      setTimeout(onCloseAlert, 3000);
    }
  }, [message, type]);
  const alerts = {
    ERROR: (
      <DangerAlert isOpen={isOpen} toggle={onCloseAlert}>
        {message}
      </DangerAlert>
    ),
    SUCCESS: (
      <SuccessAlert isOpen={isOpen} toggle={onCloseAlert}>
        {message}
      </SuccessAlert>
    ),
  };
  return <div>{alerts[type]}</div>;
};

AlertsContainer.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ alert }) => ({ alert });

export default connect(mapStateToProps)(AlertsContainer);
