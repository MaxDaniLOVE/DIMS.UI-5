import React from 'react';
import PropTypes from 'prop-types';
import { dateToString } from '../../utils/convertDate';
import RadioInput from '../../UI/RadioInput';

import './FormModal.scss';

const FormModal = ({ onFormChange, isEditMode, data, inputs }) => {
  const inputsLabels = inputs.map(({ label, id, type, options }) => {
    if (type === 'radio') {
      return (
        <RadioInput
          key={id}
          label={label}
          id={id}
          type={type}
          options={options}
          onChange={onFormChange}
          data={data}
          isEditMode={isEditMode}
        />
      );
    }
    const convertationDict = {
      date: dateToString(data[id]),
    };
    let inputPlaceholder;
    if (isEditMode) {
      inputPlaceholder = convertationDict[type] || data[id];
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
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormModal;
