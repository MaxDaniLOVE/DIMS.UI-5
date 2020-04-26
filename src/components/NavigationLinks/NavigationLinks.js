import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '../../UI/Buttons';

const NavigationLinks = ({ onClick, onLogOut }) => {
  const links = [
    {
      link: '/members',
      label: 'All members',
    },
    {
      link: '/tasks',
      label: 'All tasks',
    },
    {
      link: '/member/subtasks',
      label: 'My tasks',
    },
  ];
  return (
    <>
      {links.map(({ link, label }) => (
        <NavLink key={link} activeClassName='active-link' to={link} onClick={onClick}>
          {label}
        </NavLink>
      ))}
      <LogoutButton onClick={onLogOut}>LogOut</LogoutButton>
    </>
  );
};

NavigationLinks.defaultProps = {
  onClick: () => {},
};

NavigationLinks.propTypes = {
  onClick: PropTypes.func,
  onLogOut: PropTypes.func.isRequired,
};

export default NavigationLinks;
