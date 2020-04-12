import React from 'react';
import './Status.scss';

const Status = ({ stateId }) => {
  if (!stateId) {
    return <span className='failed'>Failed!</span>;
  }
  const anotherState =
    stateId === 1 ? <span className='success'>Success!</span> : <span className='active'>Active</span>;
  return anotherState;
};

export default Status;
