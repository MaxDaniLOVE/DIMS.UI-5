import React from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import './darkModeToggle.scss';

const DarkModeToggle = () => {
  return (
    <FormGroup className='dark-mode-toggle'>
      <CustomInput
        type='switch'
        id='dark-mode-switch'
        name='dark-mode-switch'
        label='Enable dark mode'
        onChange={() => {}}
      />
    </FormGroup>
  );
};

export default DarkModeToggle;
