/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SuccessButton } from '../../UI/Buttons';
import { loginWithGithub, loginWithFacebook } from '../../store/actions';

const LoginServices = ({ loginWithGithub, loginWithFacebook }) => {
  return (
    <div className='services-container'>
      <SuccessButton onClick={loginWithGithub}>GITHUB!</SuccessButton>
      <SuccessButton onClick={loginWithFacebook}>FACEBOOK!</SuccessButton>
    </div>
  );
};

LoginServices.propTypes = {
  loginWithGithub: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginWithGithub, loginWithFacebook }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginServices);
