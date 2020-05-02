import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../Navigation';
import Footer from '../../UI/Footer';
import AuthContextProvider from '../AuthContextProvider';
import Routes from '../Routes';
import './app.scss';

const App = () => (
  <AuthContextProvider>
    <Router>
      <Header />
      <div className='container'>
        <Switch>
          <Routes />
        </Switch>
      </div>
      <Footer />
    </Router>
  </AuthContextProvider>
);

export default App;
