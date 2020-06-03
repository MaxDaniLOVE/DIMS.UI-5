/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './sideBar.scss';

const SideBar = ({ children, isOpen, onClick, isDarkMode }) => {
  const classNames = isOpen
    ? {
        backdropClassName: 'backdrop__open',
        sideBarClassName: isDarkMode ? 'side-bar__open dark-sidebar' : 'side-bar__open',
      }
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
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToProps, null)(SideBar);
