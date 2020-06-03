import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const LinkButton = ({ children, link }) => {
  return (
    <Button>
      <Link to={link}>{children}</Link>
    </Button>
  );
};

LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkButton;
