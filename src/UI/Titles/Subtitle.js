import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = ({ children }) => <h3 className='subtitle'>{children}</h3>;

Subtitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Subtitle;
