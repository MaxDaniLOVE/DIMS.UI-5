import React from 'react';
import PropTypes from 'prop-types';
import { SubmitButton } from '../../UI/Buttons';
import './loginForm.scss';

const LoginForm = ({ onFormChange, onSubmit, inputs, isFormValid }) => {
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
        {inputsField}
        <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
          Login
        </SubmitButton>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

export default LoginForm;
