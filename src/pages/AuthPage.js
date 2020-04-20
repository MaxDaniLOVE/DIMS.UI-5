import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return <LoginForm />;
  }
}

export default AuthPage;
