/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DangerButton, BurgerButton } from '../../UI/Buttons';
import { logOut } from '../../store/actions';
import MainHeader from '../MainHeader';
import SideBar from '../SideBar';
import CreateRolesLink from '../CreateRolesLink';
import CurrentUser from '../../UI/CurrentUser';
import getMailLogin from '../../utils/getMailLogin';
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
    const { logOut } = this.props;
    logOut();
    this.onCloseSideBar();
  };

  render() {
    const { isSideBarOpen } = this.state;
    const {
      logOut,
      isLoggedIn,
      user: { role, userId, email },
    } = this.props;
    return (
      <>
        <SideBar isOpen={isSideBarOpen} onClick={this.onCloseSideBar}>
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
            <CurrentUser>{getMailLogin(email)}</CurrentUser>
            <BurgerButton onClick={this.onOpenSideBar} />
            <nav className='navigation__header-nav'>
              <CreateRolesLink onLogOut={logOut} isLoggedIn={isLoggedIn} role={role} userId={userId} />
            </nav>
          </>
        </MainHeader>
      </>
    );
  }
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ auth: { user, isLoggedIn } }) => ({ user, isLoggedIn });

const mapDispatchToProps = (dispatch) => bindActionCreators({ logOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
