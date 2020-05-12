import React from 'react';
import PropTypes from 'prop-types';
import './sideBar.scss';

const SideBar = ({ children, isOpen, onClick }) => {
  return (
    isOpen && (
      <>
        <div className='backdrop' onClick={onClick} />
        <aside className='side-bar'>{children}</aside>
      </>
    )
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SideBar;
