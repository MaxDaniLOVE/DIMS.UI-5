import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import Preloader from '../components/Preloader';
import Button from '../UI/Button';
import TasksTable from '../components/TasksTable';
import Modal from '../UI/Modal';
import ModalInputs from '../components/ModalInputs';
import { tasksInputs as inputs } from '../utils/inputs';
import { inputsParser } from '../utils/inputsParser';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      taskData: {},
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
  }

  onModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      taskData: {},
      isEditMode: false,
      isDetailMode: false,
    });
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ taskData }) => ({
      taskData: inputsParser(value, id, taskData),
    }));
  };

  render() {
    const { tasks, isLoaded, showModal, isEditMode, isDetailMode, taskData } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    return (
      <div className='table-wrapper'>
        <Modal
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={this.onModalClose}
          onSubmit={() => console.log(taskData)}
        >
          {isDetailMode ? (
            <div>details</div>
          ) : (
            <ModalInputs inputs={inputs} onFormChange={this.onFormChange} isEditMode={isEditMode} data={taskData} />
          )}
        </Modal>
        {isLoaded ? (
          <>
            <Button customClass='btn-success' customStyles={btnStyles} onClick={this.onModalOpen}>
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
