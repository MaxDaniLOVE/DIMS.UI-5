import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { AvGroup, AvField } from 'availity-reactstrap-validation';
import RadioInput from '../../UI/RadioInput';

import './formModal.scss';

const FormModal = ({ onFormChange, isEditMode, data, inputs, modalHeader }) => {
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
    return (
      <AvGroup className='form-inputs' key={id}>
        <Label htmlFor={id}>
          {label}
          <AvField
            name={id}
            value={inputPlaceholder}
            type={type}
            id={id}
            onChange={onFormChange}
            validate={{
              required: { value: true, errorMessage: "You can't leave empty field" },
              pattern: {
                value: validationPattern,
                errorMessage,
              },
            }}
          />
        </Label>
      </AvGroup>
    );
  });
  return (
    <>
      {modalHeader}
      <div className='modal__content_container'>{inputsLabels}</div>
    </>
  );
};

FormModal.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalHeader: PropTypes.element.isRequired,
};

export default FormModal;
