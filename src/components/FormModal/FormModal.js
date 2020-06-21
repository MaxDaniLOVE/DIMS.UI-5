import React from 'react';
import PropTypes from 'prop-types';
import RadioInput from '../../UI/RadioInput';
import { fieldValidation, dateValidation } from '../../utils/validation';
import InputGroup from '../InputGroup';

import './formModal.scss';

const FormModal = ({ addClassName, onFormChange, isEditMode, data, inputs, modalHeader }) => {
  const inputsLabels = inputs.map(({ label, id, type, options, validationPattern, dateToCompare }) => {
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
    const inputPlaceholder = data[id];
    let pattern = fieldValidation(validationPattern);
    if (dateToCompare) {
      const startDate = data[dateToCompare];
      pattern = dateValidation(pattern, startDate);
    }
    return (
      <InputGroup key={id} id={id} value={inputPlaceholder} type={type} onChange={onFormChange} validate={pattern}>
        {label}
      </InputGroup>
    );
  });
  return (
    <>
      {modalHeader}
      <div className={`modal__content_container ${addClassName}`}>{inputsLabels}</div>
    </>
  );
};

FormModal.propTypes = {
  addClassName: PropTypes.string.isRequired,
  onFormChange: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalHeader: PropTypes.element.isRequired,
};

export default FormModal;
