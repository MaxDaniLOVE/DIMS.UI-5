import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const OutlineButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} newClassName='btn-outline'>
      {children}
    </Button>
  );
};

OutlineButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default OutlineButton;
