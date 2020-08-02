import React from 'react';
import PropTypes from 'prop-types';
import { Label, CustomInput } from 'reactstrap';

import './checkboxInput.scss';

const CheckboxInput = ({ id, options, onChange, label, dataToCompare }) => {
  return (
    <div className='form-inputs__checkbox'>
      <Label htmlFor={id}>{label}</Label>
      <div className='checkboxes__wrapper'>
        {options.map((option) => (
          <Label htmlFor={`${id}_${option}_filter`} key={`${id}_${option}_filter`}>
            <CustomInput
              value={option}
              type='checkbox'
              id={`${id}_${option}_filter`}
              onChange={onChange}
              checked={dataToCompare.includes(option)}
            />
            {option}
          </Label>
        ))}
      </div>
    </div>
  );
};

CheckboxInput.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  dataToCompare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckboxInput;
