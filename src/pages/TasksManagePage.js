import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import Firebase from '../services/Firebase';
import Preloader from '../components/Preloader';
import { Button } from '../UI/Buttons';
import TasksTable from '../components/TasksTable';
import { defaultTaskData } from '../utils/defaultInputsData';
import { tasksInputs } from '../utils/inputs';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { validation } from '../utils/validation';
import ModalContent from '../UI/ModalContent';
import DataModal from '../components/DataModal';
import FormModal from '../components/FormModal';
import { stringToDate, dateToString } from '../utils/convertDate';
import { getTasks } from '../store/actions';

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
    const { match } = this.props;
    const {
      params: { tid },
    } = match;
    this.getTasksData(tid);
  }

  static getDerivedStateFromProps(nextProps) {
    const { tasks } = nextProps;
    return {
      tasks,
    };
  }

  async getTasksData(tid) {
    const { getAllTasks } = this.props;
    await getAllTasks();
    this.setState({
      isLoaded: true,
    });
    if (tid) {
      await this.onEditTaskModalOpen(tid);
    }
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
      const updated = inputsChangeHandler(value, id, taskData);
      const validatedInputs = { ...updated };
      const isFormValid = validation(validatedInputs, tasksInputs);
      return {
        taskData: updated,
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
      const userTask = { state: 'active', taskId, userId };
      const { name } = task;
      const firstSubtask = await this.db.createFirstSubtask(name, userId, taskId);
      await this.db.addNewSubtask(firstSubtask);
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

  onSubmit = () => {
    const { isEditMode, taskData } = this.state;
    return isEditMode ? this.onSubmitEditTask(taskData) : this.onAddTask(taskData);
  };

  render() {
    const { tasks, isLoaded, isEditMode, showModal, isDetailMode, isFormValid, taskData, assignedMembers } = this.state;
    const modalHeader = isEditMode || isDetailMode ? <h3>{`Task - ${taskData.name}:`}</h3> : <h3>Add new task:</h3>;
    return (
      <div className='table-wrapper'>
        <Modal isOpen={showModal} toggle={this.onModalClose}>
          <ModalContent
            showModal={showModal}
            isEditMode={isEditMode}
            isDetailMode={isDetailMode}
            onModalClose={this.onModalClose}
            isFormValid={isFormValid}
            onCheckboxChange={this.onCheckboxChange}
            isCheckboxShow
            assignedMembers={assignedMembers}
            onSubmit={this.onSubmit}
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
          </ModalContent>
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
  getAllTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getTasks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksManagePage);
