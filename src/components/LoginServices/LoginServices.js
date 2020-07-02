/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GithubIcon, GoogleIcon, FacebookIcon } from '../../assets/icons';
import { loginWithGithub, loginWithFacebook, loginWithGoogle } from '../../store/actions';
import './loginServices.scss';

const LoginServices = ({ loginWithGithub, loginWithFacebook, loginWithGoogle }) => {
  return (
    <div className='services-container'>
      <GithubIcon onClick={loginWithGithub} />
      <FacebookIcon onClick={loginWithFacebook} />
      <GoogleIcon onClick={loginWithGoogle} />
    </div>
  );
};

LoginServices.propTypes = {
  loginWithGithub: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginWithGithub, loginWithFacebook, loginWithGoogle }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginServices);
