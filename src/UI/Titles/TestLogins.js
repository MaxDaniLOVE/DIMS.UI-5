import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TestLogins = ({ isLoggedIn }) =>
  !isLoggedIn ? (
    <h6 className='footer__hints'>LOGINS: admin@gmail.com, mentor@gmail.com, testuser@gmail.com, PASS: 12345678</h6>
  ) : null;

TestLogins.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth: { isLoggedIn } }) => {
  return { isLoggedIn };
};

export default connect(mapStateToProps, null)(TestLogins);
