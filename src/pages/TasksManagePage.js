import React, { Component } from 'react';
import Firebase from '../services/Firebase';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    this.db.getAllTasks().then((data) => {
      const newData = [];
      data.forEach((doc) => newData.push(doc.data()));
      this.setState({
        tasks: newData,
      });
    });
  }

  render() {
    const { tasks } = this.state;
    return <div>TasksManage</div>;
  }
}

export default TasksManagePage;
