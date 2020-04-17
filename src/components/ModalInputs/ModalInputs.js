import React from 'react';
import PropTypes from 'prop-types';
import { dateToString } from '../../utils/convertDate';

import './MembersPageModal.scss';
// TODO rename it
const ModalInputs = ({ onFormChange, isEditMode, data, inputs }) => {
  const inputsLabels = inputs.map(({ label, id, type, options }) => {
    if (type === 'radio' || type === 'checkbox') {
      return (
        <div className='form-inputs' key={id}>
          {label}
          {options.map((option, idx) => {
            let isChecked;
            if (type === 'radio' && isEditMode) {
              isChecked = data[id] === option;
            }
            if (type === 'checkbox' && isEditMode) {
              isChecked = data[id][idx].userId === option.userId && option.isSelected;
            }
            return (
              <label htmlFor={id} key={type === 'radio' ? option : option.userId}>
                <input
                  name={id}
                  type={type}
                  id={id}
                  onChange={(e) => onFormChange(e)}
                  value={type === 'radio' ? option : option.userId}
                  checked={isEditMode ? isChecked : undefined}
                />
                {type === 'radio' ? option : option.fullName}
              </label>
            );
          })}
        </div>
      );
    }
    let value;
    if (isEditMode && type !== 'date') {
      value = data[id];
    }
    if (isEditMode && type === 'date') {
      value = dateToString(data[id]);
    }
    return (
      <div className='form-inputs' key={id}>
        <label htmlFor={id}>
          {label}
          <input value={isEditMode ? value : undefined} type={type} id={id} onChange={(e) => onFormChange(e)} />
        </label>
      </div>
    );
  });
  const { name, lastName } = data;
  const title = isEditMode ? `${name} ${lastName}:` : 'Register new user:';
  return (
    <>
      <h3>{title}</h3>
      <div className='modal__content_container'>{inputsLabels}</div>
    </>
  );
};

ModalInputs.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ModalInputs;
