import React from 'react';
import PropTypes from 'prop-types';
import inputs from '../../utils/inputs';
import { dateToString } from '../../utils/convertDate';

import './MembersPageModal.scss';

const MembersPageModal = ({ onFormChange, isEditMode, registerData }) => {
  const inputsLabels = inputs.map(({ label, id, type, options }) => {
    if (type === 'radio') {
      return (
        <div className='form-inputs' key={id}>
          {label}
          {options.map((option) => (
            <label htmlFor={id} key={option}>
              <input
                name={id}
                type={type}
                id={id}
                onChange={(e) => onFormChange(e)}
                value={option}
                checked={isEditMode ? registerData[id] === option : false}
              />
              {option}
            </label>
          ))}
        </div>
      );
    }
    let value;
    if (isEditMode && type !== 'date') {
      value = registerData[id];
    }
    if (isEditMode && type === 'date') {
      value = dateToString(registerData[id]);
    }
    return (
      <div className='form-inputs' key={id}>
        <label htmlFor={id}>
          {label}
          <input value={value || ''} type={type} id={id} onChange={(e) => onFormChange(e)} />
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
  isEditMode: PropTypes.bool.isRequired,
  registerData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MembersPageModal;
