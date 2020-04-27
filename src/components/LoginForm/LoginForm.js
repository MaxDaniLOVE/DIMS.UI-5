import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { SubmitButton, SuccessButton } from '../../UI/Buttons';

import './loginForm.scss';

const LoginForm = ({ onFormChange, onSubmit, inputs, isFormValid, isRegisterMode, onSwitchMode }) => {
  const inputsField = inputs.map(({ label, id, type, validationPattern }) => (
    <AvGroup className='login-form__input' key={id}>
      <Label htmlFor={id}>
        {label}
        <AvInput
          name={id}
          type={type}
          id={id}
          onChange={onFormChange}
          validate={{
            required: { value: true, errorMessage: 'Please enter a name' },
            pattern: {
              value: validationPattern,
              errorMessage: 'Your name must be composed only with letter and numbers',
            },
          }}
        />
      </Label>
    </AvGroup>
  ));
  return (
    <div className='login-form-wrapper'>
      <AvForm className='login-form' onSubmit={onSubmit}>
        <h3>{isRegisterMode ? 'Register:' : 'Login:'}</h3>
        {inputsField}
        <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
          {isRegisterMode ? 'Register' : 'Login'}
        </SubmitButton>
      </AvForm>
      <SuccessButton onClick={onSwitchMode}>{isRegisterMode ? 'Switch to login' : 'Switch to register'}</SuccessButton>
    </div>
  );
};

LoginForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  isRegisterMode: PropTypes.bool.isRequired,
  onSwitchMode: PropTypes.func.isRequired,
};

export default LoginForm;
