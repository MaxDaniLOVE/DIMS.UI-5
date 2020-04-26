import React, { Component } from 'react';
import { DangerButton, BurgerButton } from '../../UI/Buttons';
import MainHeader from '../MainHeader';
import SideBar from '../SideBar';
import NavigationLinks from '../NavigationLinks';
import AuthContext from '../../context';
import './navigation.scss';

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
    const { onLogOut } = this.context;
    return (
      <>
        <SideBar isOpen={isSideBarOpen}>
          <>
            <DangerButton onClick={this.onCloseSideBar}>X</DangerButton>
            <NavigationLinks onClick={this.onCloseSideBar} onLogOut={onLogOut} />
          </>
        </SideBar>
        <MainHeader>
          <>
            <BurgerButton onClick={this.onOpenSideBar} />
            <nav className='navigation__header-nav'>
              <NavigationLinks onLogOut={onLogOut} />
            </nav>
          </>
        </MainHeader>
      </>
    );
  }
}

Navigation.contextType = AuthContext;

export default Navigation;
