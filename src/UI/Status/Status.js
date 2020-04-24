import React from 'react';
import PropTypes from 'prop-types';
import './status.scss';

const Status = ({ stateId }) => {
  const stateValues = {
    0: {
      stateName: 'Failed!',
      stateClass: 'failed',
    },
    1: {
      stateName: 'Success!',
      stateClass: 'success',
    },
    2: {
      stateName: 'Active',
      stateClass: 'active',
    },
  };
  const { stateName, stateClass } = stateValues[stateId];
  return <span className={stateClass}>{stateName}</span>;
};

Status.propTypes = {
  stateId: PropTypes.number.isRequired,
};

export default Status;
