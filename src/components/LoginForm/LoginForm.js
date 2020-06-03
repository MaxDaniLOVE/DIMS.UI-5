import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { SubmitButton, SuccessButton } from '../../UI/Buttons';
import { fieldValidation } from '../../utils/validation';

import './loginForm.scss';

const LoginForm = ({ onFormChange, onSubmit, inputs, isFormValid, isRegisterMode, onSwitchMode, isDarkMode }) => {
  const inputsField = inputs.map(({ label, id, type, validationPattern, errorMessage }) => {
    const pattern = fieldValidation(validationPattern, errorMessage);
    return (
      <AvGroup className='login-form__input' key={id}>
        <Label htmlFor={id}>
          {label}
          <AvField name={id} type={type} id={id} onChange={onFormChange} validate={pattern} />
        </Label>
      </AvGroup>
    );
  });

  const classNames = isDarkMode
    ? { formClassName: 'login-form dark-form', wrapperClassName: 'login-form-wrapper dark-wrapper' }
    : { formClassName: 'login-form', wrapperClassName: 'login-form-wrapper' };
  const { formClassName, wrapperClassName } = classNames;
  return (
    <div className={wrapperClassName}>
      <AvForm className={formClassName} onSubmit={onSubmit}>
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
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToProps, null)(LoginForm);
