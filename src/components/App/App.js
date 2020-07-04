/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { changeStatus } from '../../store/actions';
import Header from '../Navigation';
import Footer from '../../UI/Footer';
import Routes from '../Routes';
import AlertsContainer from '../AlertsContainer';
import { useLayoutEffect } from '../../hooks';
import './app.scss';

const App = ({ changeStatus, isDarkMode }) => {
  useEffect(() => {
    changeStatus();
  }, [changeStatus]);
  useLayoutEffect(isDarkMode);
  const containerClassName = isDarkMode ? 'dark-mode-container' : '';
  return (
    <Router>
      <Header />
      <Container className={containerClassName}>
        <Switch>
          <Routes />
        </Switch>
      </Container>
      <Footer />
      <AlertsContainer />
    </Router>
  );
};

App.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeStatus }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
