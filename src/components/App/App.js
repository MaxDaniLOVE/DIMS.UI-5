import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Firebase from '../../services/Firebase';
import MembersPage from '../../pages/MembersPage';
import MembersProgressPage from '../../pages/MembersProgressPage';
import MembersTasksPage from '../../pages/MembersTasksPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    const db = new Firebase();
    db.getTestData().then((data) => {
      const newMembers = [];
      data.forEach((doc) => {
        newMembers.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        members: newMembers,
      });
    });
  }

  render() {
    const { members } = this.state;
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='members' />
          </Route>
          <Route path='/members'>
            <MembersPage members={members} />
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
