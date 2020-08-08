import React from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvField } from 'availity-reactstrap-validation';
import { InputGroupAddon, InputGroupText } from 'reactstrap';
import { CrossIcon } from '../../assets/icons';
import './dateInput.scss';

const DateInput = ({ id, value, children, onChange, resetDateInput, validate }) => {
  const onClick = () => resetDateInput(id);

  return (
    <AvGroup className='date-input-group__wrapper'>
      {children}
      <AvGroup className='date-input-group'>
        <AvField name={id} id={id} type='date' onChange={onChange} value={value} validate={validate} />
        <InputGroupAddon addonType='append'>
          <InputGroupText onClick={onClick}>
            <CrossIcon />
          </InputGroupText>
        </InputGroupAddon>
      </AvGroup>
    </AvGroup>
  );
};

DateInput.defaultProps = {
  validate: {},
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  resetDateInput: PropTypes.func.isRequired,
  validate: PropTypes.objectOf(
    PropTypes.shape({
      pattern: PropTypes.objectOf(PropTypes.string),
      required: PropTypes.objectOf(PropTypes.string, PropTypes.bool),
    }),
  ),
};

export default DateInput;
