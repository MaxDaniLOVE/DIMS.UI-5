import React from 'react';
import PropTypes from 'prop-types';
import './currentUser.scss';

const CurrentUser = ({ children }) => <div className='current-user'>{children}</div>;

CurrentUser.defaultProps = {
  children: '',
};

CurrentUser.propTypes = {
  children: PropTypes.string,
};

export default CurrentUser;
