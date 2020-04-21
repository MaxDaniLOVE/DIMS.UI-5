import React from 'react';
import PropTypes from 'prop-types';
import { SuccessButton } from '../../UI/Buttons';
import './LoginForm.scss';

const LoginForm = ({ onFormChange, onSubmit, inputs }) => {
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
        <SuccessButton onClick={onSubmit}>Login</SuccessButton>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
