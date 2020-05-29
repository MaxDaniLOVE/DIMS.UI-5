import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';
import { connect } from 'react-redux';

const MainHeader = ({ children, isDarkMode }) => {
  const navClassName = isDarkMode ? 'navigation dark-navigation' : 'navigation';
  return <Navbar className={navClassName}>{children}</Navbar>;
};

MainHeader.defaultProps = {
  children: null,
};

MainHeader.propTypes = {
  children: PropTypes.element,
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToProps, null)(MainHeader);
