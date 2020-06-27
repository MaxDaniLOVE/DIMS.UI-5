import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputGroup from '../InputGroup';
import { ShowPassIcon, HidePassIcon } from '../../assets/icons';

const PassInput = ({ id, value, onChange, validate, children }) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const inputType = isShowPass ? 'text' : 'password';

  const showPassHandler = useCallback(() => setIsShowPass(!isShowPass), [isShowPass]);

  return (
    <div className='pass-input-wrapper'>
      <InputGroup key={id} id={id} value={value} type={inputType} onChange={onChange} validate={validate}>
        {children}
      </InputGroup>
      <button onClick={showPassHandler} type='button' className='pass-hide-btn'>
        {isShowPass ? <HidePassIcon /> : <ShowPassIcon />}
      </button>
    </div>
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
