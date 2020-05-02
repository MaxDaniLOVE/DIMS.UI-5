import React, { Component } from 'react';
import { DangerButton, BurgerButton } from '../../UI/Buttons';
import MainHeader from '../MainHeader';
import SideBar from '../SideBar';
import CreateRolesLink from '../CreateRolesLink';
import AuthContext from '../../context';
import CurrentUser from '../../UI/CurrentUser';
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

  onLogOutHandle = () => {
    const { onLogOut } = this.context;
    onLogOut();
    this.onCloseSideBar();
  };

  render() {
    const { isSideBarOpen } = this.state;
    const {
      onLogOut,
      isLoggedIn,
      user: { role, userId, email },
    } = this.context;
    return (
      <>
        <SideBar isOpen={isSideBarOpen}>
          <>
            <DangerButton onClick={this.onCloseSideBar}>X</DangerButton>
            <CreateRolesLink
              onClick={this.onCloseSideBar}
              isLoggedIn={isLoggedIn}
              onLogOut={this.onLogOutHandle}
              role={role}
              userId={userId}
            />
          </>
        </SideBar>
        <MainHeader>
          <>
            <CurrentUser>{email}</CurrentUser>
            <BurgerButton onClick={this.onOpenSideBar} />
            <nav className='navigation__header-nav'>
              <CreateRolesLink onLogOut={onLogOut} isLoggedIn={isLoggedIn} role={role} userId={userId} />
            </nav>
          </>
        </MainHeader>
      </>
    );
  }
}

Navigation.contextType = AuthContext;

export default Navigation;
