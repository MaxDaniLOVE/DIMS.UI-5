import React from 'react';
import PropTypes from 'prop-types';
import { CustomInput } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { SubmitButton } from '../../UI/Buttons';

const ChangePassForm = ({ children, isFormValid, onSubmit, showPassHandler, isShowPass }) => {
  return (
    <AvForm>
      {children}
      <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
        Change
      </SubmitButton>
      <CustomInput
        type='switch'
        id='exampleCustomSwitch'
        name='customSwitch'
        label='Show password'
        checked={isShowPass}
        onChange={showPassHandler}
      />
    </AvForm>
  );
};

ChangePassForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  showPassHandler: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isShowPass: PropTypes.bool.isRequired,
};

export default ChangePassForm;
