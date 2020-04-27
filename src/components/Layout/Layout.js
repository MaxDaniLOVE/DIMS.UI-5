import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return <div className='table-wrapper'>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
