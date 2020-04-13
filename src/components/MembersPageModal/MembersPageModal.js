import React from 'react';
import PropTypes from 'prop-types';
import inputs from '../../utils/inputs';

import './MembersPageModal.scss';

const MembersPageModal = ({ onFormChange }) => {
  const inputsLabels = inputs.map(({ label, id, type, options }) => {
    if (type === 'radio') {
      return (
        <div className='form-inputs' key={id}>
          {label}
          {options.map((option) => (
            <label htmlFor={id} key={option}>
              <input name={id} type={type} id={id} onChange={(e) => onFormChange(e)} value={option} />
              {option}
            </label>
          ))}
        </div>
      );
    }
    return (
      <div className='form-inputs' key={id}>
        <label htmlFor={id}>
          {label}
          <input type={type} id={id} onChange={(e) => onFormChange(e)} />
        </label>
      </div>
    );
  });
  return (
    <>
      <h3>Register new user:</h3>
      <div className='modal__content_container'>{inputsLabels}</div>
    </>
  );
};

MembersPageModal.propTypes = {
  onFormChange: PropTypes.func.isRequired,
};

export default MembersPageModal;
