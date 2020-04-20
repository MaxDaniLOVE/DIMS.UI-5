import React from 'react';
import PropTypes from 'prop-types';
import { dateToString } from '../../utils/convertDate';

import './FormModal.scss';

const FormModal = ({ onFormChange, isEditMode, data, inputs }) => {
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
                onChange={onFormChange}
                value={option}
                checked={isEditMode ? data[id] === option : undefined}
              />
              {option}
            </label>
          ))}
        </div>
      );
    }
    let inputPlaceholder;
    if (isEditMode && type !== 'date') {
      inputPlaceholder = data[id];
    }
    if (isEditMode && type === 'date') {
      inputPlaceholder = dateToString(data[id]);
    }
    return (
      <div className='form-inputs' key={id}>
        <label htmlFor={id}>
          {label}
          <input
            value={isEditMode ? inputPlaceholder : undefined}
            type={type}
            id={id}
            onChange={(e) => onFormChange(e)}
          />
        </label>
      </div>
    );
  });
  const { name, lastName } = data;
  const title = isEditMode ? `${name} ${lastName}:` : 'Register new user:';
  return (
    <>
      <h3>{title}</h3>
      <div className='modal__content_container'>{inputsLabels}</div>
    </>
  );
};

FormModal.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormModal;
