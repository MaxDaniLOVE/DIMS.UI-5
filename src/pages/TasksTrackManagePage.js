import React, { Component } from 'react';
import Firebase from '../services/Firebase';

class TasksTrackManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isLoaded: false,
    };
    this.db = new Firebase();
  }

  render() {
    return <div>My Tasks</div>;
  }
}

export default TasksTrackManagePage;
