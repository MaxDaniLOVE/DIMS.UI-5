/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { logIn, registerUser, startAuth } from '../store/actions';
import LoginForm from '../components/LoginForm';
import { defaultAuthData } from '../utils/defaultInputsData';
import { authInputs as inputs } from '../utils/inputs';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { validation } from '../utils/validation';
import ServiceToggle from '../components/ServiceToggle';
import Preloader from '../components/Preloader';

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
    const { logIn, registerUser, startAuth } = this.props;
    startAuth();
    return isRegisterMode ? registerUser(authData) : logIn(authData);
  };

  render() {
    const { isFormValid, isRegisterMode } = this.state;
    const { isAuthStarted } = this.props;
    return isAuthStarted ? (
      <Preloader />
    ) : (
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

AuthPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  isAuthStarted: PropTypes.bool.isRequired,
  startAuth: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isAuthStarted } }) => {
  return { isAuthStarted };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logIn, registerUser, startAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
