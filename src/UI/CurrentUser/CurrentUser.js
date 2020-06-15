import React from 'react';
import PropTypes from 'prop-types';
import getMailLogin from '../../utils/getMailLogin';
import './currentUser.scss';

const CurrentUser = ({ children }) => <div className='current-user'>{getMailLogin(children)}</div>;

CurrentUser.defaultProps = {
  children: '',
};

CurrentUser.propTypes = {
  children: PropTypes.string,
};

export default CurrentUser;
