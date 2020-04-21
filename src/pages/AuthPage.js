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

  onMailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onPassChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = () => {
    const { password, email } = this.state;
    console.log(password, email);
  };

  render() {
    return <LoginForm onSubmit={this.onSubmit} onMailChange={this.onMailChange} onPassChange={this.onPassChange} />;
  }
}

export default AuthPage;
