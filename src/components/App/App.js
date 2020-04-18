import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MembersPage from '../../pages/MembersPage';
import MembersProgressPage from '../../pages/MembersProgressPage';
import MembersTasksPage from '../../pages/MembersTasksPage';
import Header from '../Navigation';
import TasksManagePage from '../../pages/TasksManagePage';
import TasksTrackManagePage from '../../pages/TasksTrackManagePage';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <Redirect to='members' />
            </Route>
            <Route path='/members'>
              <MembersPage />
            </Route>
            <Route path='/member/subtasks'>
              <TasksTrackManagePage />
            </Route>
            <Route path='/member/:mid/progress'>
              <MembersProgressPage />
            </Route>
            <Route path='/member/:mid/tasks'>
              <MembersTasksPage />
            </Route>
            <Route path='/tasks'>
              <TasksManagePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
