/* eslint-disable no-shadow */
import React from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import PropTypes from 'prop-types';

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

export default DarkModeToggle;
