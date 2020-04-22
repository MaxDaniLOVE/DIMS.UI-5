import React, { Component } from 'react';
import { DangerButton, BurgerButton } from '../../UI/Buttons';
import MainHeader from '../MainHeader';
import SideBar from '../SideBar';
import NavigationLinks from '../NavigationLinks';
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
    return (
      <>
        <SideBar isOpen={isSideBarOpen}>
          <>
            <DangerButton onClick={() => this.onCloseSideBar()}>X</DangerButton>
            <NavigationLinks onClick={this.onCloseSideBar} />
          </>
        </SideBar>
        <MainHeader>
          <>
            <BurgerButton onClick={() => this.onOpenSideBar()} />
            <nav className='navigation__header-nav'>
              <NavigationLinks />
            </nav>
          </>
        </MainHeader>
      </>
    );
  }
}

export default Navigation;
