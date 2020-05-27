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

const App = ({ changeStatus }) => {
  useEffect(() => {
    changeStatus();
  }, [changeStatus]);
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
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeStatus }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
