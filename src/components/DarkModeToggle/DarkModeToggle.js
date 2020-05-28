/* eslint-disable no-shadow */
import React from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchDarkMode } from '../../store/actions';

import './darkModeToggle.scss';

const DarkModeToggle = ({ isDarkMode, switchDarkMode }) => {
  return (
    <FormGroup className='dark-mode-toggle'>
      <CustomInput
        type='switch'
        id='dark-mode-switch'
        name='dark-mode-switch'
        label='Enable dark mode'
        checked={isDarkMode}
        onChange={switchDarkMode}
      />
    </FormGroup>
  );
};

DarkModeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  switchDarkMode: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ switchDarkMode }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeToggle);
