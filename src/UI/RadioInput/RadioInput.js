import React from 'react';
import PropTypes from 'prop-types';

const RadioInput = (props) => {
  const { label, id, type, options, onChange, data } = props;
  return (
    <div className='form-inputs' key={id}>
      {label}
      {options.map((option) => (
        <label htmlFor={id} key={option}>
          <input name={id} type={type} id={id} onChange={onChange} value={option} checked={data[id] === option} />
          {option}
        </label>
      ))}
    </div>
  );
};

RadioInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RadioInput;
