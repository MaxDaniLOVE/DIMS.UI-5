import React from 'react';
import './preloader.scss';

const Preloader = () => {
  return (
    <div className='preloader-wrapper'>
      <div className='preloader'>
        <div className='preloader__first-child' />
        <div className='preloader__second-child' />
      </div>
    </div>
  );
};

export default Preloader;
