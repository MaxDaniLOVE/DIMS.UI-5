import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../Navigation';
import Footer from '../../UI/Footer';
import AuthContext from '../../context';
import Authentication from '../../services/Authentication';
import Routes from '../Routes';
import './app.scss';

const auth = new Authentication();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    this.onStatusChanged();
  }

  onStatusChanged = async () => {
    const userStatus = await auth.onStatusChanged();
    const { isLoggedIn, role, email, userId, userName } = userStatus;
    let user = isLoggedIn ? { role, email } : {};
    if (role === 'USER') {
      user = { ...user, userId, userName };
    }
    this.setState({ isLoggedIn, user });
    return { isLoggedIn, user };
  };

  onLogIn = async (authData) => {
    await auth.login(authData);
    const user = await this.onStatusChanged();
    this.setState({ ...user });
  };

  onLogOut = async () => {
    await auth.logout();
    await this.onStatusChanged();
  };

  onRegister = async (authData) => {
    await auth.registerNewUser(authData);
    const user = await this.onStatusChanged();
    this.setState({ user });
  };

  render() {
    const { isLoggedIn, user } = this.state;
    const { role } = user;
    const defaultContextValue = {
      isLoggedIn,
      onLogIn: this.onLogIn,
      onLogOut: this.onLogOut,
      onRegister: this.onRegister,
      user,
    };
    const routes = <Routes role={role} />;
    return (
      <AuthContext.Provider value={defaultContextValue}>
        <Router>
          <Header />
          <div className='container'>
            <Switch>{routes}</Switch>
          </div>
          <Footer />
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
