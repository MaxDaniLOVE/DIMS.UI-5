import React from 'react';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { SubmitButton, GoBackButton } from '../../UI/Buttons';
import { SaveIcon } from '../../assets/icons';
import './changePassForm.scss';

const ChangePassForm = ({ children, isFormValid, onSubmit, showPassHandler, isShowPass, closeModal }) => {
  return (
    <AvForm className='modal-window' id='change-pass-modal'>
      {children}
      <CustomInput
        type='switch'
        id='exampleCustomSwitch'
        name='customSwitch'
        label='Show password'
        checked={isShowPass}
        onChange={showPassHandler}
      />
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
  showPassHandler: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isShowPass: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ChangePassForm;
