import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '../../UI/Buttons';
import rolesLinks from '../../utils/rolesLinks';

const CreateRolesLink = ({ onClick, onLogOut, role, userId, isLoggedIn }) => {
  const links = rolesLinks(role, userId);
  return (
    <>
      {links.map(({ link, label }) => (
        <NavLink key={link} activeClassName='active-link' to={link} onClick={onClick}>
          {label}
        </NavLink>
      ))}
      {isLoggedIn ? <LogoutButton onClick={onLogOut}>LogOut</LogoutButton> : null}
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

export default CreateRolesLink;
