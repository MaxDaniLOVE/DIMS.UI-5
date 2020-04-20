import React from 'react';
import { SuccessButton } from '../../UI/Buttons';
import './LoginForm.scss';

const LoginForm = () => {
  return (
    <div className='login-form-wrapper'>
      <form className='login-form'>
        Email:
        <input />
        Password:
        <input />
        <SuccessButton>Login</SuccessButton>
      </form>
    </div>
  );
};

export default LoginForm;
