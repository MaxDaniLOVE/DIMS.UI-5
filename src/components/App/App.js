import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MembersPage from '../../pages/MembersPage';
import MembersProgressPage from '../../pages/MembersProgressPage';
import MembersTasksPage from '../../pages/MembersTasksPage';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='members' />
          </Route>
          <Route path='/members'>
            <MembersPage />
          </Route>
          <Route path='/member/:mid/progress'>
            <MembersProgressPage />
          </Route>
          <Route path='/member/:mid/tasks'>
            <MembersTasksPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
