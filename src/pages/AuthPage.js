import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { defaultAuthData } from '../utils/defaultInputsData';
import { authInputs as inputs } from '../utils/inputs';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import validation from '../utils/validation';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authData: defaultAuthData,
      isFormValid: false,
    };
  }

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ authData }) => {
      const updatedAuthData = inputsChangeHandler(value, id, authData);
      const isValid = validation(updatedAuthData, inputs);
      return {
        authData: updatedAuthData,
        isFormValid: isValid,
      };
    });
  };

  onSubmit = () => {
    const { authData } = this.state;
    console.log(authData);
  };

  render() {
    const { isFormValid } = this.state;
    return (
      <LoginForm inputs={inputs} onSubmit={this.onSubmit} onFormChange={this.onFormChange} isFormValid={isFormValid} />
    );
  }
}

export default AuthPage;
