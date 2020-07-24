import React from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import './radioInput.scss';

const RadioInput = (props) => {
  const { label, id, type, options, onChange, data, isFilter } = props;
  return (
    <FormGroup className='form-inputs form-inputs__radio' key={id}>
      <Label>{label}</Label>
      <div className='radio-btns__wrapper'>
        {options.map((option) => {
          const inputId = isFilter ? `${id}_${option}_filter` : `${id}_${option}`;
          return (
            <Label className='radio-label' htmlFor={inputId} key={option}>
              <CustomInput
                name={id}
                type={type}
                id={inputId}
                onChange={onChange}
                value={option}
                checked={data[id] === option}
              />
              {option}
            </Label>
          );
        })}
      </div>
    </FormGroup>
  );
};

RadioInput.defaultProps = {
  isFilter: false,
};

RadioInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isFilter: PropTypes.bool,
};

export default RadioInput;
