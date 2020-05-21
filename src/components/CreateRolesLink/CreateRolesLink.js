import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actions';
import { LogoutButton } from '../../UI/Buttons';
import rolesLinks from '../../utils/rolesLinks';

const CreateRolesLink = ({ onClick, onLogOut, role, userId, isLoggedIn, logOut }) => {
  const links = rolesLinks(role, userId);
  const onClickLogOut = () => {
    // TODO delete it
    onLogOut();
    logOut();
  };
  return (
    <>
      {links.map(({ link, label }) => (
        <NavLink key={link} activeClassName='active-link' to={link} onClick={onClick}>
          {label}
        </NavLink>
      ))}
      {isLoggedIn ? <LogoutButton onClick={onClickLogOut}>LogOut</LogoutButton> : null}
    </>
  );
};

CreateRolesLink.defaultProps = {
  onClick: () => {},
  role: '',
  userId: '',
};

CreateRolesLink.propTypes = {
  onClick: PropTypes.func,
  onLogOut: PropTypes.func.isRequired,
  role: PropTypes.string,
  userId: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ logOut }, dispatch);

export default connect(null, mapDispatchToProps)(CreateRolesLink);
