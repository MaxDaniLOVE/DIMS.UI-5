import React from 'react';
import PropTypes from 'prop-types';
import { SubmitButton, SuccessButton } from '../../UI/Buttons';
import './loginForm.scss';

const LoginForm = ({ onFormChange, onSubmit, inputs, isFormValid, isRegisterMode, onSwitchMode }) => {
  const inputsField = inputs.map(({ label, id, type }) => (
    <div className='login-form__input' key={id}>
      <label htmlFor={id}>
        {label}
        <input type={type} id={id} onChange={onFormChange} />
      </label>
    </div>
  ));
  return (
    <div className='login-form-wrapper'>
      <form className='login-form' onSubmit={onSubmit}>
        <h3>{isRegisterMode ? 'Register:' : 'Login:'}</h3>
        {inputsField}
        <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
          {isRegisterMode ? 'Register' : 'Login'}
        </SubmitButton>
      </form>
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
