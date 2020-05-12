import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../UI/Backdrop';
import './sideBar.scss';

const SideBar = ({ children, isOpen, onClick }) => {
  const onBackdropClick = ({ target: { id } }) => id === 'backdrop' && onClick();
  return (
    isOpen && (
      <Backdrop onClick={onBackdropClick}>
        <aside className='side-bar'>{children}</aside>
      </Backdrop>
    )
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SideBar;
