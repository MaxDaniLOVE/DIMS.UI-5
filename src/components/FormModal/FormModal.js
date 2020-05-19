import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { AvGroup, AvField } from 'availity-reactstrap-validation';
import RadioInput from '../../UI/RadioInput';
import { fieldValidation } from '../../utils/validation';

import './formModal.scss';

const FormModal = ({ addClassName, onFormChange, isEditMode, data, inputs, modalHeader }) => {
  const inputsLabels = inputs.map(({ label, id, type, options, validationPattern, errorMessage }) => {
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
    const pattern = fieldValidation(validationPattern, errorMessage);
    return (
      <AvGroup className='form-inputs' key={id}>
        <Label htmlFor={id}>
          {label}
          <AvField name={id} value={inputPlaceholder} type={type} id={id} onChange={onFormChange} validate={pattern} />
        </Label>
      </AvGroup>
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
