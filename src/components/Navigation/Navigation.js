import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../UI/Button';
import MainHeader from '../MainHeader';
import './Navigation.scss';

const Navigation = () => {
  return (
    <>
      <MainHeader>
        <Button customClass='navigation__menu-btn menu-btn' onClick={() => console.log('open side bar')}>
          <span />
          <span />
          <span />
        </Button>
        <nav className='navigation__header-nav'>
          <NavLink activeClassName='active-link' to='/members'>
            All members
          </NavLink>
        </nav>
      </MainHeader>
    </>
  );
};

export default Navigation;
