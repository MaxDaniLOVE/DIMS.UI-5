import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';

import './ageInputs.scss';

const AgeInputs = ({ options, onChange, minAge, maxAge }) => {
  return (
    <div className='age-inputs'>
      <Label key='age' htmlFor='age'>
        Age:
        <div className='age-inputs__wrapper'>
          {options.map((option) => {
            const value = option === 'minAge' ? minAge : maxAge;
            const min = option === 'minAge' ? 18 : minAge;
            const max = option === 'minAge' ? maxAge : 100;
            const placeholder = option === 'minAge' ? 'from:' : 'to:';
            return (
              <Input
                key={option}
                placeholder={placeholder}
                id={option}
                type='number'
                onChange={onChange}
                value={value}
                min={min}
                max={max}
              />
            );
          })}
        </div>
      </Label>
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
