import React from 'react';
import PropTypes from 'prop-types';
import { HidePassIcon, ShowPassIcon } from '../../assets/icons';
import Button from './Button';

const PassButton = ({ onClick, isShowPass }) => {
  return (
    <Button onClick={onClick} id='pass-hide-btn'>
      {isShowPass ? <HidePassIcon /> : <ShowPassIcon />}
    </Button>
  );
};

PassButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowPass: PropTypes.bool.isRequired,
};

export default PassButton;
