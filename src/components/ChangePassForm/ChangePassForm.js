import React from 'react';
import PropTypes from 'prop-types';
import { AvForm } from 'availity-reactstrap-validation';
import { SubmitButton, GoBackButton } from '../../UI/Buttons';
import { SaveIcon } from '../../assets/icons';
import { Subtitle } from '../../UI/Titles';
import './changePassForm.scss';

const ChangePassForm = ({ children, isFormValid, onSubmit, closeModal }) => {
  return (
    <AvForm className='modal-window' id='change-pass-modal'>
      <Subtitle>Enter new password:</Subtitle>
      <div className='modal-window__content'>{children}</div>
      <div className='modal-window__footer'>
        <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
          <SaveIcon />
        </SubmitButton>
        <GoBackButton onClick={closeModal} />
      </div>
    </AvForm>
  );
};

ChangePassForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ChangePassForm;
