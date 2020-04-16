import React from 'react';
import './SideBar.scss';

const SideBar = ({ children, isOpen }) => {
  const showSideBar = isOpen ? {} : { display: 'none' };
  return (
    <aside style={showSideBar} className='side-bar'>
      {children}
    </aside>
  );
};

export default SideBar;
