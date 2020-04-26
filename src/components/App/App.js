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
    };
  }

  componentDidMount() {
    this.onStatusChanged();
  }

  onStatusChanged = async () => {
    const isLoggedIn = await auth.onStatusChanged();
    this.setState({ isLoggedIn });
  };

  onLogIn = async (authData) => {
    const user = await auth.login(authData);
    await this.onStatusChanged();
    return user;
  };

  onLogOut = async () => {
    await auth.logout();
    await this.onStatusChanged();
  };

  render() {
    const { isLoggedIn } = this.state;
    const defaultContextValue = {
      isLoggedIn,
      onLogIn: this.onLogIn,
      onLogOut: this.onLogOut,
    };
    return (
      <AuthContext.Provider value={defaultContextValue}>
        <Router>
          <Header />
          <div className='container'>
            <Switch>
              <Route exact path='/'>
                <Redirect to='members' />
              </Route>
              <Route path='/auth'>
                <AuthPage />
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
            </Switch>
          </div>
          <Footer />
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
