import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthContext from '../context';
import { logIn, registerUser } from '../store/actions';
import LoginForm from '../components/LoginForm';
import { defaultAuthData } from '../utils/defaultInputsData';
import { authInputs as inputs } from '../utils/inputs';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { validation } from '../utils/validation';
import ServiceToggle from '../components/ServiceToggle';

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
    const { logIn, registerUser } = this.props;
    this.setState({
      authData: defaultAuthData,
      isFormValid: false,
    });
    logIn(authData);
    return isRegisterMode ? onRegister(authData) : onLogIn(authData);
  };

  render() {
    const { isFormValid, isRegisterMode } = this.state;
    return (
      <>
        <LoginForm
          inputs={inputs}
          onSubmit={this.onSubmit}
          onFormChange={this.onFormChange}
          isFormValid={isFormValid}
          onSwitchMode={this.onSwitchMode}
          isRegisterMode={isRegisterMode}
        />
        <ServiceToggle />
      </>
    );
  }
}
AuthPage.contextType = AuthContext;

const mapDispatchToProps = (dispatch) => bindActionCreators({ logIn, registerUser }, dispatch);

export default connect(null, mapDispatchToProps)(AuthPage);
