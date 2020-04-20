import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ children, link }) => {
  return (
    <button className='btn' type='button'>
      <Link to={link}>{children}</Link>
    </button>
  );
};

LinkButton.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkButton;
