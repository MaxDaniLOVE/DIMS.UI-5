import React from 'react';
import PropTypes from 'prop-types';

const MainHeader = ({ children }) => {
  return <header className='navigation'>{children}</header>;
};

MainHeader.defaultProps = {
  children: null,
};

MainHeader.propTypes = {
  children: PropTypes.element,
};

export default MainHeader;
