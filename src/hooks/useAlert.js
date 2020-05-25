import React, { useState, useEffect } from 'react';
import { DangerAlert, SuccessAlert } from '../UI/Alerts';

const useAlert = ({ message, type }) => {
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
  return alerts[type];
};

export default useAlert;
