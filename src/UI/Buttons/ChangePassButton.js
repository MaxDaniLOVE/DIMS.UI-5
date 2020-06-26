import React from 'react';
import PropTypes from 'prop-types';
import { EditUserIcon } from '../../assets/icons';

const ChangePassButton = ({ onClick, children }) => (
  <button onClick={onClick} className='change-pass-btn' type='button'>
    {children && (
      <>
        {children}
        <EditUserIcon />
      </>
    )}
  </button>
);

ChangePassButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChangePassButton;
