import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const OutlineButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} outline className='btn-outline'>
      {children}
    </Button>
  );
};

OutlineButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default OutlineButton;
