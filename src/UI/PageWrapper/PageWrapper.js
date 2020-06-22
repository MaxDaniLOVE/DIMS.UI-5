import React from 'react';
import PropTypes from 'prop-types';
import './pageWrapper.scss';

const PageWrapper = ({ children }) => <div className='page-wrapper'>{children}</div>;

PageWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageWrapper;
