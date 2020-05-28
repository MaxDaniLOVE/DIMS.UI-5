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
import './app.scss';

const App = ({ changeStatus, isDarkMode }) => {
  useEffect(() => {
    changeStatus();
  }, [changeStatus]);
  if (isDarkMode) {
    document.body.style.backgroundColor = '#414754';
  } else {
    document.body.style.backgroundColor = '#e3e8f0';
  }
  return (
    <Router>
      <Header />
      <Container>
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
