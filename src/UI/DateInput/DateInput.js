import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { CrossIcon } from '../../assets/icons';
import './dateInput.scss';

const DateInput = ({ id, value, label, onChange, resetDateInput }) => {
  const onClick = () => resetDateInput(id);

  return (
    <Label>
      {label}
      <InputGroup>
        <Input id={id} type='date' onChange={onChange} value={value} />
        <InputGroupAddon addonType='append'>
          <InputGroupText onClick={onClick}>
            <CrossIcon />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Label>

    // <InputGroup htmlFor={id}>
    //   <Label htmlFor='id'>{label}</Label>
    //   <Input id={id} type='date' onChange={onChange} value={value} />
    //   <InputGroupAddon addonType='append' onClick={onClick}>
    //     x
    //   </InputGroupAddon>
    // </InputGroup>
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  resetDateInput: PropTypes.func.isRequired,
};

export default DateInput;
