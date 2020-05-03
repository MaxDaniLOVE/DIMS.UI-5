import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const LogoutButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} className='btn-logout'>
      {children}
    </Button>
  );
};

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default LogoutButton;
