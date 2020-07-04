import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Label, InputGroupAddon } from 'reactstrap';
import { AvGroup, AvField } from 'availity-reactstrap-validation';
import './passInput.scss';
import { HidePassButton } from '../../UI/Buttons';

const PassInput = ({ id, value, onChange, validate, children }) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const inputType = isShowPass ? 'text' : 'password';

  const showPassHandler = useCallback(() => setIsShowPass(!isShowPass), [isShowPass]);

  return (
    <AvGroup className='form-inputs pass-inputs'>
      <Label htmlFor={id}>
        {children}
        <AvGroup id='pass-inputs-wrapper'>
          <AvField name={id} value={value} type={inputType} id={id} onChange={onChange} validate={validate} />
          <InputGroupAddon addonType='append'>
            <HidePassButton onClick={showPassHandler} isShowPass={isShowPass} />
          </InputGroupAddon>
        </AvGroup>
      </Label>
    </AvGroup>
  );
};

PassInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.objectOf(
    PropTypes.shape({
      pattern: PropTypes.objectOf(PropTypes.string),
      required: PropTypes.objectOf(PropTypes.string, PropTypes.bool),
    }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.string.isRequired,
};

export default PassInput;
