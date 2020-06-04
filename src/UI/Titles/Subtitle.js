import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = ({ children, additionalClass }) => <h3 className={`${additionalClass} subtitle`}>{children}</h3>;

Subtitle.defaultProps = { additionalClass: '' };

Subtitle.propTypes = {
  children: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
};

export default Subtitle;
