import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvForm } from 'availity-reactstrap-validation';
import { SubmitButton, SuccessButton } from '../../UI/Buttons';
import { fieldValidation } from '../../utils/validation';
import PassInput from '../PassInput';
import InputGroup from '../InputGroup';
import './loginForm.scss';

const LoginForm = ({ onFormChange, onSubmit, inputs, isFormValid, isDarkMode, authData, onLoginWithGithub }) => {
  const inputsField = inputs.map(({ label, id, type, validationPattern }) => {
    const pattern = fieldValidation(validationPattern);
    const value = authData[id];

    if (type === 'password') {
      return (
        <PassInput value={value} key={id} id={id} onChange={onFormChange} validate={pattern}>
          {label}
        </PassInput>
      );
    }

    return (
      <InputGroup
        value={value}
        className='login-form__input'
        key={id}
        id={id}
        type={type}
        onChange={onFormChange}
        validate={pattern}
      >
        {label}
      </InputGroup>
    );
  });

  const classNames = isDarkMode
    ? { formClassName: 'login-form dark-form', wrapperClassName: 'login-form-wrapper dark-wrapper' }
    : { formClassName: 'login-form', wrapperClassName: 'login-form-wrapper' };
  const { formClassName, wrapperClassName } = classNames;
  return (
    <div className={wrapperClassName}>
      <AvForm className={formClassName} onSubmit={onSubmit}>
        <h3>Login:</h3>
        {inputsField}
        <SuccessButton onClick={onLoginWithGithub}>GITHUB!</SuccessButton>
        <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
          Login
        </SubmitButton>
      </AvForm>
    </div>
  );
};

LoginForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  authData: PropTypes.objectOf(PropTypes.string).isRequired,
  onLoginWithGithub: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToProps, null)(LoginForm);
