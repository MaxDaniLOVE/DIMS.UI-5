import React from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvField } from 'availity-reactstrap-validation';
import { Label, InputGroupAddon, InputGroupText } from 'reactstrap';
import { CrossIcon } from '../../assets/icons';
import './dateInput.scss';

const DateInput = ({ id, value, children, onChange, resetDateInput, validate = {} }) => {
  const onClick = () => resetDateInput(id);

  return (
    <Label>
      {children}
      <AvGroup className='date-input-group'>
        <AvField name={id} id={id} type='date' onChange={onChange} value={value} validate={validate} />
        <InputGroupAddon addonType='append'>
          <InputGroupText onClick={onClick}>
            <CrossIcon />
          </InputGroupText>
        </InputGroupAddon>
      </AvGroup>
    </Label>
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  resetDateInput: PropTypes.func.isRequired,
};

export default DateInput;
