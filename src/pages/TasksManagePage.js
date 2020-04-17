import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import Preloader from '../components/Preloader';
import Button from '../UI/Button';
import TasksTable from '../components/TasksTable';
import Modal from '../UI/Modal';
import ModalInputs from '../components/ModalInputs';
import DataModal from '../components/DataModal';
import { tasksInputs as inputs } from '../utils/inputs';
import { inputsParser, defaultTaskData } from '../utils/inputsParser';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      taskData: defaultTaskData,
      isLoaded: false,
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
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
    this.db.getUsersData().then((data) => {
      const usersData = [];
      data.forEach((doc) => {
        const fullName = `${doc.data().name} ${doc.data().lastName}`;
        usersData.push({ fullName, userId: doc.id });
      });
      this.setState(({ taskData }) => ({
        taskData: { ...taskData, members: usersData },
      }));
    });
  }

  onModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    this.setState(({ taskData }) => ({
      showModal: false,
      taskData: { ...this.defaultTaskData, members: taskData.members },
      isEditMode: false,
      isDetailMode: false,
    }));
  };

  onFormChange = (e) => {
    const { value, id, checked, type } = e.target;
    const sendData = type === 'checkbox' ? { userId: value, checked } : value;
    this.setState(({ taskData }) => ({
      taskData: inputsParser(sendData, id, taskData),
    }));
  };

  onSubmitEditTask = (task) => {
    console.log('this task edited');
    console.log(task);
  };

  onAddNewTask = (task) => {
    console.log('this task added');
    console.log(task);
  };

  onEditTaskModalOpen = (id) => {
    const { tasks } = this.state;
    const editedTask = tasks.find(({ taskId }) => id === taskId);
    this.onModalOpen();
    this.setState({
      taskData: { ...editedTask },
      isEditMode: true,
    });
  };

  onTasksDataOpen = (id) => {
    const { tasks } = this.state;
    const editedTask = tasks.find(({ taskId }) => id === taskId);
    this.onModalOpen();
    this.setState({
      taskData: { ...editedTask },
      isDetailMode: true,
    });
  };

  render() {
    const { tasks, isLoaded, showModal, isEditMode, isDetailMode, taskData } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    const checkboxes = {
      label: 'Members:',
      id: 'members',
      type: 'checkbox',
      options: taskData.members,
    };
    return (
      <div className='table-wrapper'>
        <Modal
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={this.onModalClose}
          onSubmit={() => (isEditMode ? this.onSubmitEditTask(taskData) : this.onAddNewTask(taskData))}
        >
          {isDetailMode ? (
            <DataModal data={taskData} inputs={inputs} />
          ) : (
            <ModalInputs
              inputs={[...inputs, checkboxes]}
              onFormChange={this.onFormChange}
              isEditMode={isEditMode}
              data={taskData}
            />
          )}
        </Modal>
        {isLoaded ? (
          <>
            <Button customClass='btn-success' customStyles={btnStyles} onClick={this.onModalOpen}>
              <p className='btn-inner'>Create</p>
            </Button>
            <TasksTable
              tasks={tasks}
              onEditTaskModalOpen={this.onEditTaskModalOpen}
              onTasksDataOpen={this.onTasksDataOpen}
            />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

export default TasksManagePage;
