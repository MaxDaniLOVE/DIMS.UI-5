import React from 'react';
import PropTypes from 'prop-types';
import inputs from '../../utils/inputs';

import './MembersPageModal.scss';

const MembersPageModal = ({ onFormChange }) => {
  const inputsLabels = inputs.map(({ label, id, type }) => (
    <div className='form-inputs' key={id}>
      <label htmlFor={id}>
        {label}
        <input type={type} id={id} onChange={(e) => onFormChange(e)} />
      </label>
    </div>
  ));
  return (
    <>
      <h3>Register new user:</h3>
      {inputsLabels}
    </>
  );
};

MembersPageModal.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default MembersPageModal;
