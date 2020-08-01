import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';

const AgeInputs = ({ options, onChange, minAge, maxAge }) => {
  return (
    <div className='age=inputs'>
      {options.map((option) => {
        const value = option === 'minAge' ? minAge : maxAge;
        const min = option === 'minAge' ? 18 : minAge;
        const max = option === 'minAge' ? maxAge : 100;
        const placeholder = option === 'minAge' ? 'from' : 'to';
        return (
          <Label key={option} htmlFor={option}>
            {option}
            <Input
              placeholder={placeholder}
              id={option}
              type='number'
              onChange={onChange}
              value={value}
              min={min}
              max={max}
            />
          </Label>
        );
      })}
    </div>
  );
};

AgeInputs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  minAge: PropTypes.string.isRequired,
  maxAge: PropTypes.string.isRequired,
};

export default AgeInputs;
