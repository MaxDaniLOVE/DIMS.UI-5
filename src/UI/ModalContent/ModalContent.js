import React from 'react';
import PropTypes from 'prop-types';
import { AvForm } from 'availity-reactstrap-validation';
import { GoBackButton, SubmitButton } from '../Buttons';
import Checkboxes from '../Checkboxes';
import './modal.scss';

const ModalContent = ({ children, onModalClose, onSubmit, isDetailMode, isFormValid, isCheckboxShow, isEditMode }) => {
  return (
    <AvForm className='modal-window' onSubmit={onSubmit}>
      <div className='modal-window__content'>
        {children}
        {isCheckboxShow ? <Checkboxes isEditMode={isEditMode} /> : null}
      </div>
      <div className='modal-window__footer'>
        {isDetailMode ? null : (
          <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
            Save
          </SubmitButton>
        )}
        <GoBackButton onClick={onModalClose} />
      </div>
    </AvForm>
  );
};

ModalContent.defaultProps = {
  isCheckboxShow: false,
};

ModalContent.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDetailMode: PropTypes.bool.isRequired,
  isCheckboxShow: PropTypes.bool,
  isEditMode: PropTypes.bool.isRequired,
};

export default ModalContent;
