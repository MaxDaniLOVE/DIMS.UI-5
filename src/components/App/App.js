import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MembersPage from '../../pages/MembersPage';
import MembersProgressPage from '../../pages/MembersProgressPage';
import MembersTasksPage from '../../pages/MembersTasksPage';
import Header from '../Navigation';
import TasksManagePage from '../../pages/TasksManagePage';
import TasksTrackManagePage from '../../pages/TasksTrackManagePage';
import AuthPage from '../../pages/AuthPage';
import Footer from '../../UI/Footer';
import AuthContext from '../../context';
import Authentication from '../../services/Authentication';
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
    const defaultContextValue = {
      isLoggedIn,
      onLogIn: this.onLogIn,
      onLogOut: this.onLogOut,
      onRegister: this.onRegister,
      user,
    };
    const routes = isLoggedIn ? (
      <>
        <Route exact path='/'>
          <Redirect to='members' />
        </Route>
        <Route path='/members'>
          <MembersPage />
        </Route>
        <Route path='/member/subtasks/:tid?' render={(props) => <TasksTrackManagePage {...props} />} />
        <Route path='/member/:mid/progress'>
          <MembersProgressPage />
        </Route>
        <Route path='/member/:mid/tasks'>
          <MembersTasksPage />
        </Route>
        <Route path='/tasks/:tid?' render={(props) => <TasksManagePage {...props} />} />
        <Redirect to='/members' />
      </>
    ) : (
      <>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Redirect to='/auth' />
      </>
    );
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
