import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DangerAlert, SuccessAlert } from '../../UI/Alerts';

const Alert = ({ alert: { message, type } }) => {
  const [isOpen, onSetIsOpen] = useState(false);
  const onCloseAlert = () => onSetIsOpen(false);
  const onOpenAlert = () => onSetIsOpen(true);

  useEffect(() => {
    if (message && type) {
      onOpenAlert();
      setTimeout(onCloseAlert, 5000);
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

  return alerts[type] || null;
};

Alert.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Alert;
