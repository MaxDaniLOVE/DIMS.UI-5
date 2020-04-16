import React from 'react';
import PropTypes from 'prop-types';

const MainHeader = ({ children }) => {
  return <header className='navigation'>{children}</header>;
};

MainHeader.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainHeader;
