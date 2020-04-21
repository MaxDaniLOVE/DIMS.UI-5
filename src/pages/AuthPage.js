import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { defaultAuthData } from '../utils/defaultInputsData';
import { authInputs as inputs } from '../utils/inputs';
import inputsParser from '../utils/inputsParser';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authData: defaultAuthData,
    };
  }

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ authData }) => ({
      authData: inputsParser(value, id, authData),
    }));
  };

  onSubmit = () => {
    const { authData } = this.state;
    console.log(authData);
  };

  render() {
    return <LoginForm inputs={inputs} onSubmit={this.onSubmit} onFormChange={this.onFormChange} />;
  }
}

export default AuthPage;
