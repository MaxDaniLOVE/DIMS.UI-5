import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import Preloader from '../components/Preloader';
import Button from '../UI/Button';
import TasksTable from '../components/TasksTable';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isLoaded: false,
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    this.db.getAllTasks().then((data) => {
      const newData = [];
      data.forEach((doc) => newData.push({ ...doc.data(), taskId: doc.id }));
      this.setState({
        tasks: newData,
        isLoaded: true,
      });
    });
  }

  render() {
    const { tasks, isLoaded } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    return (
      <div className='table-wrapper'>
        {isLoaded ? (
          <>
            <Button customClass='btn-success' customStyles={btnStyles}>
              <p className='btn-inner'>Create</p>
            </Button>
            <TasksTable tasks={tasks} />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

export default TasksManagePage;
