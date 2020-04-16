import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../UI/Button';
import MainHeader from '../MainHeader';
import SideBar from '../SideBar';
import './Navigation.scss';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isSideBarOpen: false,
    };
  }

  onOpenSideBar = () => {
    this.setState({
      isSideBarOpen: true,
    });
  };

  onCloseSideBar = () => {
    this.setState({
      isSideBarOpen: false,
    });
  };

  render() {
    const { isSideBarOpen } = this.state;
    return (
      <>
        <SideBar isOpen={isSideBarOpen}>
          <Button customClass='btn-danger' onClick={() => this.onCloseSideBar()}>
            <p className='btn-inner'>X</p>
          </Button>
          <NavLink activeClassName='active-link' to='/members'>
            All members
          </NavLink>
        </SideBar>
        <MainHeader>
          <Button customClass='navigation__menu-btn menu-btn' onClick={() => this.onOpenSideBar()}>
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
  }
}

export default Navigation;
