import React from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';

const DangerSubtitle = ({ children }) => <Subtitle additionalClass='danger-subtitle'>{children}</Subtitle>;

DangerSubtitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DangerSubtitle;
