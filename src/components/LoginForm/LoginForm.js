import React from 'react';
import PropTypes from 'prop-types';
import { SuccessButton } from '../../UI/Buttons';
import './LoginForm.scss';

const LoginForm = ({ onMailChange, onPassChange, onSubmit }) => {
  return (
    <div className='login-form-wrapper'>
      <form className='login-form' onSubmit={onSubmit}>
        <div className='login-form__input'>
          <label htmlFor='email'>
            Email:
            <input type='text' id='email' onChange={onMailChange} />
          </label>
        </div>
        <div className='login-form__input'>
          <label htmlFor='pass'>
            Password:
            <input type='password' id='pass' onChange={onPassChange} />
          </label>
        </div>
        <SuccessButton onClick={onSubmit}>Login</SuccessButton>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onMailChange: PropTypes.func.isRequired,
  onPassChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
