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
import { dateToString } from '../utils/convertDate';
import { getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers } from '../store/actions';
import pagesInitialState from '../utils/pagesInitialState';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      ...pagesInitialState,
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    const { match, setTaskData } = this.props;
    const {
      params: { tid },
    } = match;
    setTaskData(defaultTaskData);
    this.getTasksData(tid);
  }

  async getTasksData(taskId) {
    const { getAllTasks } = this.props;
    await getAllTasks();
    this.setState({
      isLoaded: true,
    });
    if (taskId) {
      await this.onEditTaskModalOpen(taskId);
    }
  }

  onModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    const { setTaskData } = this.props;
    setTaskData(defaultTaskData);
    this.setState({
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onDeleteTask = async (taskId) => {
    const { deleteTaskById } = this.props;
    await deleteTaskById(taskId);
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    const { setTaskData, formData } = this.props;
    const updated = inputsChangeHandler(value, id, formData);
    const validatedInputs = { ...updated };
    const isFormValid = validation(validatedInputs, tasksInputs);
    setTaskData(updated);
    this.setState({ isFormValid });
  };

  onAddTask = async () => {
    const { addNewTask } = this.props;
    const taskId = await addNewTask();
    this.onModalClose();
    return taskId;
  };

  onEditTaskModalOpen = async (id) => {
    const { tasks, setTaskData, assignUser } = this.props;
    const editedTask = tasks.find(({ taskId }) => taskId === id);
    const assignedMembers = await this.db.getAssignedUsers(id); // TODO move to the appropriate handler
    assignUser(assignedMembers);
    const { deadlineDate, startDate } = editedTask;
    setTaskData({ ...editedTask, deadlineDate: dateToString(deadlineDate), startDate: dateToString(startDate) });
    this.setState({
      isEditMode: true,
      isFormValid: true,
    });
    this.onModalOpen();
  };

  onSubmitEditTask = async () => {
    const { editCreatedTask } = this.props;
    await editCreatedTask();
    this.onModalClose();
  };

  onSubmit = () => {
    const { isEditMode } = this.state;
    return isEditMode ? this.onSubmitEditTask() : this.onAddTask();
  };

  render() {
    const { isLoaded, isEditMode, showModal, isDetailMode, isFormValid } = this.state;
    const { tasks, formData } = this.props;
    const modalHeader = isEditMode || isDetailMode ? <h3>{`Task - ${formData.name}:`}</h3> : <h3>Add new task:</h3>;
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
            onSubmit={this.onSubmit}
          >
            {isDetailMode ? (
              <DataModal header={modalHeader} data={formData} inputFields={tasksInputs} />
            ) : (
              <FormModal
                addClassName='tasks-modal'
                modalHeader={modalHeader}
                inputs={tasksInputs}
                data={formData}
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
  assignUser: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  setTaskData: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired,
  addNewTask: PropTypes.func.isRequired,
  deleteTaskById: PropTypes.func.isRequired,
  editCreatedTask: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ tasks, formData, assignedMembers }) => ({ tasks, formData, assignedMembers });

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getTasks()),
    addNewTask: () => dispatch(addTask()),
    deleteTaskById: (id) => dispatch(deleteTask(id)),
    editCreatedTask: () => dispatch(editTask()),
    setTaskData: (data) => dispatch(setFormData(data)),
    assignUser: (users) => dispatch(setAssignedMembers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksManagePage);
