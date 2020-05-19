import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../Navigation';
import Footer from '../../UI/Footer';
import AuthContextProvider from '../AuthContextProvider';
import Routes from '../Routes';
import AlertsContainer from '../AlertsContainer';
import './app.scss';

const App = () => {
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
        <AlertsContainer />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
