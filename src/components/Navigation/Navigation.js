import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DangerButton, BurgerButton } from '../../UI/Buttons';
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
          <>
            <DangerButton onClick={() => this.onCloseSideBar()}>X</DangerButton>
            <NavLink activeClassName='active-link' to='/members' onClick={() => this.onCloseSideBar()}>
              All members
            </NavLink>
            <NavLink activeClassName='active-link' to='/tasks'>
              All tasks
            </NavLink>
            <NavLink activeClassName='active-link' to='/member/subtasks'>
              My tasks
            </NavLink>
          </>
        </SideBar>
        <MainHeader>
          <>
            <BurgerButton onClick={() => this.onOpenSideBar()} />
            <nav className='navigation__header-nav'>
              <NavLink activeClassName='active-link' to='/members'>
                All members
              </NavLink>
              <NavLink activeClassName='active-link' to='/tasks'>
                All tasks
              </NavLink>
              <NavLink activeClassName='active-link' to='/member/subtasks'>
                My tasks
              </NavLink>
            </nav>
          </>
        </MainHeader>
      </>
    );
  }
}

export default Navigation;
