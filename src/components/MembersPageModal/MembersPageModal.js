import React from 'react';
import PropTypes from 'prop-types';
import inputs from '../../utils/inputs';
import { dateToString } from '../../utils/convertDate';
import RadioInput from '../../UI/RadioInput';

import './MembersPageModal.scss';

const MembersPageModal = ({ onFormChange, isEditMode, registerData }) => {
  const inputsLabels = inputs.map(({ label, id, type, options }) => {
    if (type === 'radio') {
      return (
        <RadioInput
          key={id}
          label={label}
          id={id}
          type={type}
          options={options}
          onChange={onFormChange}
          data={registerData}
          isEditMode={isEditMode}
        />
      );
    }
    const covertationDict = {
      date: dateToString(registerData[id]),
    };
    let inputPlaceholder;
    if (isEditMode) {
      inputPlaceholder = covertationDict[type] || registerData[id];
    }
    return (
      <div className='form-inputs' key={id}>
        <label htmlFor={id}>
          {label}
          <input
            value={isEditMode ? inputPlaceholder : undefined}
            type={type}
            id={id}
            onChange={(e) => onFormChange(e)}
          />
        </label>
      </div>
    );
  });
  const { name, lastName } = registerData;
  const title = isEditMode ? `${name} ${lastName}:` : 'Register new user:';
  return (
    <>
      <h3>{title}</h3>
      <div className='modal__content_container'>{inputsLabels}</div>
    </>
  );
};

MembersPageModal.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  registerData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MembersPageModal;
