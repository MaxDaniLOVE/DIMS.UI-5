import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../Navigation';
import Footer from '../../UI/Footer';
import AuthContextProvider from '../AuthContextProvider';
import Routes from '../Routes';
import { DangerAlert, SuccessAlert } from '../../UI/Alerts';
import './app.scss';

const App = ({ alert: { message, type } }) => {
  const alert = type === 'ERROR' ? <DangerAlert>{message}</DangerAlert> : <SuccessAlert>{message}</SuccessAlert>;
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
        {message && alert}
      </Router>
    </AuthContextProvider>
  );
};

App.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ alert }) => ({ alert });

export default connect(mapStateToProps)(App);
