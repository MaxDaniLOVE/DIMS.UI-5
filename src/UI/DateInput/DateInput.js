import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { CrossIcon } from '../../assets/icons';
import './dateInput.scss';

const DateInput = ({ id, value, children, onChange, resetDateInput }) => {
  const onClick = () => resetDateInput(id);

  return (
    <Label>
      {children}
      <InputGroup>
        <Input id={id} type='date' onChange={onChange} value={value} />
        <InputGroupAddon addonType='append'>
          <InputGroupText onClick={onClick}>
            <CrossIcon />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
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
