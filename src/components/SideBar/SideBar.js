import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.scss';

const SideBar = ({ children, isOpen }) => {
  const showSideBar = isOpen ? {} : { display: 'none' };
  return (
    <aside style={showSideBar} className='side-bar'>
      {children}
    </aside>
  );
};

SideBar.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SideBar;
