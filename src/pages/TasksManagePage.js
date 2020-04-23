import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import Preloader from '../components/Preloader';
import { Button } from '../UI/Buttons';
import TasksTable from '../components/TasksTable';
import { defaultTaskData } from '../utils/defaultInputsData';
import { tasksInputs } from '../utils/inputs';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import validation from '../utils/validation';
import Modal from '../UI/Modal';
import DataModal from '../components/DataModal';
import FormModal from '../components/FormModal';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isLoaded: false,
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      taskData: defaultTaskData,
      isFormValid: false,
      assignedMembers: [],
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    this.getTasksData();
  }

  getTasksData() {
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
      taskData: defaultTaskData,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
      assignedMembers: [],
    });
  };

  onDeleteTask = async (taskId) => {
    await this.db.deleteTask(taskId);
    this.getTasksData();
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ taskData }) => {
      const updatedTaskData = inputsChangeHandler(value, id, taskData);
      const validatedInputs = { ...updatedTaskData };
      delete validatedInputs.taskId; // delete id of objects as it's should not be validate
      const isFormValid = validation(validatedInputs, tasksInputs);
      return {
        taskData: updatedTaskData,
        isFormValid,
      };
    });
  };

  onCheckboxChange = (newMembers) => {
    this.setState({
      assignedMembers: newMembers,
    });
  };

  onAddTask = async (task) => {
    const { assignedMembers } = this.state;
    this.onModalClose();
    const taskId = await this.db.addNewTask(task);
    assignedMembers.map(async (userId) => {
      const userTask = { stateId: 2, taskId, userId };
      await this.db.addUserTask(userTask);
    });
    this.getTasksData();
  };

  onEditTaskModalOpen = async (id) => {
    const { tasks } = this.state;
    const editedTask = tasks.find(({ taskId }) => taskId === id);
    const assignedMembers = await this.db.getAssignedUsers(id);
    this.setState({
      taskData: { ...editedTask },
      isEditMode: true,
      isFormValid: true,
      assignedMembers,
    });
    this.onModalOpen();
  };

  onSubmitEditTask = (task) => {
    const { assignedMembers } = this.state;
    console.log(task);
    console.log(assignedMembers);
  };

  render() {
    const { tasks, isLoaded, isEditMode, showModal, isDetailMode, isFormValid, taskData, assignedMembers } = this.state;
    const modalHeader = <h3>{`Task - ${taskData.name}`}</h3>;
    return (
      <div className='table-wrapper'>
        <Modal
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={this.onModalClose}
          isFormValid={isFormValid}
          onCheckboxChange={this.onCheckboxChange}
          isCheckboxShow
          assignedMembers={assignedMembers}
          onSubmit={() => (isEditMode ? this.onSubmitEditTask(taskData) : this.onAddTask(taskData))}
        >
          {isDetailMode ? (
            <DataModal header={modalHeader} data={taskData} inputFields={tasksInputs} />
          ) : (
            <FormModal
              inputs={tasksInputs}
              data={taskData}
              onFormChange={this.onFormChange}
              isEditMode={isEditMode}
              isFormValid={isFormValid}
            />
          )}
        </Modal>
        {isLoaded ? (
          <>
            <Button onClick={this.onModalOpen}>Create</Button>
            <TasksTable tasks={tasks} onDeleteTask={this.onDeleteTask} onEditTaskModalOpen={this.onEditTaskModalOpen} />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

export default TasksManagePage;
