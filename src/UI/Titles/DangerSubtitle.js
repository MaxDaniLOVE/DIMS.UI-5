import React from 'react';
import PropTypes from 'prop-types';

const DangerSubtitle = ({ children }) => <h3 className='subtitle danger-subtitle'>{children}</h3>;

DangerSubtitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DangerSubtitle;
