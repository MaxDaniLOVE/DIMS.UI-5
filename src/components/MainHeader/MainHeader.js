import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';

const MainHeader = ({ children }) => <Navbar className='navigation'>{children}</Navbar>;

MainHeader.defaultProps = {
  children: null,
};

MainHeader.propTypes = {
  children: PropTypes.element,
};

export default MainHeader;
