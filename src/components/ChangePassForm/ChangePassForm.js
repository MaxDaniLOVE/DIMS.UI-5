import React from 'react';
import PropTypes from 'prop-types';
import { AvForm } from 'availity-reactstrap-validation';
import { SubmitButton, GoBackButton } from '../../UI/Buttons';
import { SaveIcon } from '../../assets/icons';
import { Subtitle } from '../../UI/Titles';
import './changePassForm.scss';
import { ModalFooter, ModalBody } from '../../UI/ModalContent';

const ChangePassForm = ({ children, isFormValid, onSubmit, closeModal }) => {
  return (
    <AvForm className='modal-window' id='change-pass-modal'>
      <Subtitle>Enter new password:</Subtitle>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
          <SaveIcon />
        </SubmitButton>
        <GoBackButton onClick={closeModal} />
      </ModalFooter>
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
