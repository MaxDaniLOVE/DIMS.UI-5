/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditUserIcon } from '../../assets/icons';
import Button from './Button';
import { throwAlert } from '../../store/actions';

const ChangePassButton = ({ onClick, children, isPasswordAuth, throwAlert }) => {
  const icon = !isPasswordAuth && <EditUserIcon />;

  const notification = () =>
    throwAlert({ type: 'ERROR', message: 'To change password sign-in with password and email!' });

  const onClickHandler = !isPasswordAuth ? onClick : notification;

  return (
    <>
      <Button onClick={onClickHandler} id='change-pass-btn'>
        {children && (
          <>
            {children}
            {icon}
          </>
        )}
      </Button>
    </>
  );
};

ChangePassButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isPasswordAuth: PropTypes.bool.isRequired,
  throwAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ throwAlert }, dispatch);
};

export default connect(null, mapDispatchToProps)(ChangePassButton);
