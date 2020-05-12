import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../Navigation';
import Footer from '../../UI/Footer';
import AuthContextProvider from '../AuthContextProvider';
import Routes from '../Routes';
import { DangerAlert } from '../../UI/Alerts';
import './app.scss';

const App = ({ error: { message } }) => {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Routes />
          </Switch>
        </Container>
        <Footer />
        {message && <DangerAlert>{message}</DangerAlert>}
      </Router>
    </AuthContextProvider>
  );
};

App.propTypes = {
  error: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ error }) => ({ error });

export default connect(mapStateToProps)(App);
