import React from 'react';
import PropTypes from 'prop-types';
import { HidePassIcon, ShowPassIcon } from '../../assets/icons';

const HidePassButton = ({ onClick, isShowPass }) => {
  return (
    <button onClick={onClick} className='pass-hide-btn' type='button'>
      {isShowPass ? <HidePassIcon /> : <ShowPassIcon />}
    </button>
  );
};

HidePassButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowPass: PropTypes.bool.isRequired,
};

export default HidePassButton;
