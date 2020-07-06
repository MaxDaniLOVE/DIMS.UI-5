import React from 'react';
import PropTypes from 'prop-types';
import { EditUserIcon } from '../../assets/icons';

const ChangePassButton = ({ onClick, children, isPasswordAuth }) => {
  const icon = !isPasswordAuth && <EditUserIcon />;
  return (
    <button onClick={onClick} className='change-pass-btn' type='button' disabled={isPasswordAuth}>
      {children && (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
};

ChangePassButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isPasswordAuth: PropTypes.bool.isRequired,
};

export default ChangePassButton;
