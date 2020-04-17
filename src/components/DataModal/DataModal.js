import React from 'react';
import PropTypes from 'prop-types';
import './DataModal.scss';

const DataModal = ({ data, inputs }) => {
  const dataStrings = inputs.map(({ label, id }) => ({
    label,
    value: data[id],
  }));
  return (
    <div>
      {dataStrings.map(({ label, value }) => {
        const newValue = label.includes('date') ? new Date(value).toLocaleDateString() : value;
        return (
          <div className='data' key={label}>
            <p className='data__label'>{label}</p>
            <p className='data__value'>{newValue}</p>
          </div>
        );
      })}
    </div>
  );
};

DataModal.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataModal;
