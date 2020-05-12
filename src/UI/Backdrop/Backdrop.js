import React from 'react';
import PropTypes from 'prop-types';

import './backdrop.scss';

const Backdrop = ({ children, onClick }) => (
  <div id='backdrop' onClick={onClick}>
    {children}
  </div>
);

Backdrop.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
