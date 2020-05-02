import React, { Component } from 'react';
import AuthContext from '../context';
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
      isRegisterMode: false,
    };
  }

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ authData }) => {
      const updated = inputsChangeHandler(value, id, authData);
      const isFormValid = validation(updated, inputs);
      return {
        authData: updated,
        isFormValid,
      };
    });
  };

  onSwitchMode = () => {
    this.setState(({ isRegisterMode }) => ({ isRegisterMode: !isRegisterMode }));
  };

  onSubmit = () => {
    const { authData, isRegisterMode } = this.state;
    const { onLogIn, onRegister } = this.context;
    this.setState({
      authData: defaultAuthData,
      isFormValid: false,
    });
    return isRegisterMode ? onRegister(authData) : onLogIn(authData);
  };

  render() {
    const { isFormValid, isRegisterMode } = this.state;
    return (
      <LoginForm
        inputs={inputs}
        onSubmit={this.onSubmit}
        onFormChange={this.onFormChange}
        isFormValid={isFormValid}
        onSwitchMode={this.onSwitchMode}
        isRegisterMode={isRegisterMode}
      />
    );
  }
}
AuthPage.contextType = AuthContext;
export default AuthPage;
