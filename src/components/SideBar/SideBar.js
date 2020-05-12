import React from 'react';
import PropTypes from 'prop-types';
import './sideBar.scss';

const SideBar = ({ children, isOpen, onClick }) => {
  const classNames = isOpen
    ? { backdropClassName: 'backdrop__open', sideBarClassName: 'side-bar__open' }
    : { backdropClassName: 'backdrop', sideBarClassName: 'side-bar' };
  const { backdropClassName, sideBarClassName } = classNames;
  return (
    <>
      <div className={backdropClassName} onClick={onClick} />
      <aside className={sideBarClassName}>{children}</aside>
    </>
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SideBar;
