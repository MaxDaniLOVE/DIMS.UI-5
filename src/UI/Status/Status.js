import React from 'react';
import './Status.scss';

const Status = ({ stateId }) => {
  if (!stateId) {
    return <span className='failed'>Failed!</span>;
  }
  return stateId === 1 ? <span className='success'>Success!</span> : <span className='active'>Active</span>;
};

export default Status;
