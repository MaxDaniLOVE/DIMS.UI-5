/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { logIn, startAuth, loginWithGithub, loginWithFacebook } from '../store/actions';
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

  onSubmit = () => {
    const { authData } = this.state;
    const { logIn, startAuth } = this.props;
    startAuth();
    logIn(authData);
  };

  onLoginWithGithub = () => {
    const { loginWithGithub } = this.props; // ! REMOVE
    loginWithGithub();
  };

  onLoginWithFacebook = () => {
    const { loginWithFacebook } = this.props; // ! REMOVE
    loginWithFacebook();
  };

  render() {
    const { isFormValid, authData } = this.state;
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
          authData={authData}
          onLoginWithGithub={this.onLoginWithGithub}
          onLoginWithFacebook={this.onLoginWithFacebook}
        />
        <ServiceToggle />
      </>
    );
  }
}

AuthPage.propTypes = {
  logIn: PropTypes.func.isRequired,
  isAuthStarted: PropTypes.bool.isRequired,
  startAuth: PropTypes.func.isRequired,
  loginWithGithub: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isAuthStarted } }) => {
  return { isAuthStarted };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logIn, startAuth, loginWithGithub, loginWithFacebook }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
