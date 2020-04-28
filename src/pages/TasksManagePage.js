import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { stringToDate, dateToString } from '../utils/convertDate';

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

  async getTasksData() {
    const { match } = this.props;
    const recievedId = match.params.tid;
    this.db.getAllTasks().then(async (data) => {
      const newData = [];
      data.forEach((doc) => newData.push({ ...doc.data(), taskId: doc.id }));
      if (recievedId) {
        const assignedMembers = await this.db.getAssignedUsers(recievedId);
        const editedTask = newData.find(({ taskId }) => taskId === recievedId);
        this.setState({
          taskData: editedTask,
          assignedMembers,
          isEditMode: true,
          showModal: true,
        });
      }
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
    const { deadlineDate, startDate } = task;
    const newTask = { ...task, deadlineDate: stringToDate(deadlineDate), startDate: stringToDate(startDate) };
    const { assignedMembers } = this.state;
    this.onModalClose();
    const taskId = await this.db.addNewTask(newTask);
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
    const { deadlineDate, startDate } = editedTask;
    this.setState({
      taskData: { ...editedTask, deadlineDate: dateToString(deadlineDate), startDate: dateToString(startDate) },
      isEditMode: true,
      isFormValid: true,
      assignedMembers,
    });
    this.onModalOpen();
  };

  onSubmitEditTask = async (task) => {
    const { deadlineDate, startDate } = task;
    const newTask = { ...task, deadlineDate: stringToDate(deadlineDate), startDate: stringToDate(startDate) };
    const { assignedMembers } = this.state;
    await this.db.editTask(newTask, assignedMembers);
    this.getTasksData();
    this.onModalClose();
  };

  render() {
    const { tasks, isLoaded, isEditMode, showModal, isDetailMode, isFormValid, taskData, assignedMembers } = this.state;
    const modalHeader = isEditMode || isDetailMode ? <h3>{`Task - ${taskData.name}:`}</h3> : <h3>Add new task:</h3>;
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
              modalHeader={modalHeader}
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

TasksManagePage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TasksManagePage;
