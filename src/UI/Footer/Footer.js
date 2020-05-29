/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getCurrentYear } from '../../utils/convertDate';
import DarkModeToggle from '../../components/DarkModeToggle';
import { switchDarkMode } from '../../store/actions';
import './footer.scss';

const Footer = ({ isDarkMode, switchDarkMode }) => {
  const footerClassName = isDarkMode ? 'footer dark-footer' : 'footer';
  return (
    <footer className={footerClassName}>
      <DarkModeToggle isDarkMode={isDarkMode} switchDarkMode={switchDarkMode} />
      <h6 className='footer__title'>{getCurrentYear()}</h6>
    </footer>
  );
};

Footer.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  switchDarkMode: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ switchDarkMode }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
