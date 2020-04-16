import React, { Component } from 'react';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    console.log('mounted!');
  }

  render() {
    return <div>TasksManage</div>;
  }
}

export default TasksManagePage;
