/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import pagesInitialState from '../utils/pagesInitialState';
import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  setFormData,
  getTasks,
  addTask,
  deleteTask,
  editTask,
  setAssignedMembers,
  getUserProgress,
  deleteUserProgress,
  editUserProgress,
  addUserProgress,
} from '../store/actions/dataActions';
import closingModalDelay from '../utils/closingModalDelay';
import { defaultRegisterData, defaultTaskData, defaultSubtaskData } from '../utils/defaultInputsData';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { membersInputs, tasksInputs, subtasksInputs } from '../utils/inputs';
import { validation } from '../utils/validation';
import Firebase from '../services/Firebase';
import transformEditData from '../utils/transformEditData';

const db = new Firebase();

const withModal = (WrappedComponent, pageType) =>
  class ModalContainer extends Component {
    constructor(props) {
      super(props);
      const {
        getUsers,
        addUser,
        editUser,
        deleteUser,
        getTasks,
        addTask,
        deleteTask,
        editTask,
        setAssignedMembers,
        getUserProgress,
        deleteUserProgress,
        editUserProgress,
        addUserProgress,
      } = props;
      switch (pageType) {
        case 'MEMBERS_PAGE':
          this.getData = getUsers;
          this.addData = addUser;
          this.editData = editUser;
          this.deleteData = deleteUser;
          this.defaultInputsData = defaultRegisterData;
          this.dataInputs = membersInputs;
          break;
        case 'TASK_PAGE':
          this.getData = getTasks;
          this.addData = addTask;
          this.editData = editTask;
          this.deleteData = deleteTask;
          this.defaultInputsData = defaultTaskData;
          this.dataInputs = tasksInputs;
          break;
        case 'TRACK_PAGE':
          this.getData = getUserProgress;
          this.addData = addUserProgress;
          this.editData = editUserProgress;
          this.deleteData = deleteUserProgress;
          this.defaultInputsData = defaultSubtaskData;
          this.dataInputs = subtasksInputs;
          break;
        default:
          break;
      }
      this.setAssignedMembers = setAssignedMembers;
      this.state = {
        ...pagesInitialState,
        pageData: [],
      };
    }

    componentDidMount() {
      const {
        user: { userId },
        match: {
          params: { tid },
        },
      } = this.props;
      this.fetchData(tid, userId);
    }

    static getDerivedStateFromProps(nextProps) {
      const { members, tasks, progress } = nextProps;
      const mainData = {
        MEMBERS_PAGE: members,
        TASK_PAGE: tasks,
        TRACK_PAGE: progress,
      };
      const pageData = mainData[pageType];
      return { pageData };
    }

    fetchData = async (tid, userId) => {
      await this.getData(userId);
      this.setState({
        isLoaded: true,
      });
      if (tid) {
        return pageType === 'TRACK_PAGE' ? this.onSubtaskModalOpen(tid) : this.onEditDataModalOpen(tid);
      }
      return null;
    };

    onModalOpen = () => {
      this.setState({
        showModal: true,
      });
    };

    onSubtaskModalOpen = (taskId) => {
      const { progress, setFormData, formData } = this.props;
      const editedTask = progress.find(({ taskId: id }) => id === taskId);
      const { taskName } = editedTask;
      setFormData({ ...formData, taskId, taskName });
      this.onModalOpen();
    };

    onModalClose = () => {
      const { setFormData } = this.props;
      closingModalDelay(this, this.defaultInputsData, setFormData);
    };

    onFormChange = (e) => {
      const {
        setFormData,
        formData,
        user: { userId, userName },
      } = this.props;
      const { value, id } = e.target;
      const { taskId, taskName } = formData;
      const updated = inputsChangeHandler(value, id, formData);
      let isFormValid;
      if (pageType === 'TRACK_PAGE') {
        const newSubtask = {
          taskId,
          taskName,
          userId,
          userName,
          ...updated,
        };

        const validatedInputs = {
          trackNote: newSubtask.trackNote,
          trackDate: newSubtask.trackDate,
        };
        isFormValid = validation(validatedInputs, subtasksInputs);
        setFormData(newSubtask);
      } else {
        const validatedInputs = { ...updated };
        isFormValid = validation(validatedInputs, this.dataInputs);
        setFormData(updated);
      }
      this.setState({ isFormValid });
    };

    onAddData = async () => {
      await this.addData();
      this.onModalClose();
    };

    onDeleteData = async (id) => {
      const {
        user: { userId },
      } = this.props;
      const response = await this.deleteData(id, userId);
      return response;
    };

    onEditDataModalOpen = async (recievedId) => {
      const { setFormData, setAssignedMembers } = this.props;
      const { pageData } = this.state;
      const formData = transformEditData(pageType, pageData, recievedId);
      if (pageType === 'TASK_PAGE') {
        const assignedMembers = await db.getAssignedUsers(recievedId); // TODO move to the appropriate handler
        setAssignedMembers(assignedMembers);
      }
      setFormData(formData);
      this.onModalOpen();
      return this.setState({
        isEditMode: true,
        isFormValid: true,
      });
    };

    onDataOpen = (recievedId) => {
      const { setFormData } = this.props;
      const { pageData } = this.state;
      const editedUser =
        pageType === 'MEMBERS_PAGE'
          ? pageData.find(({ id }) => id === recievedId)
          : pageData.find(({ taskTrackId }) => taskTrackId === recievedId);
      setFormData(editedUser);
      this.setState({
        showModal: true,
        isDetailMode: true,
      });
    };

    onSubmitEditData = async () => {
      await this.editData();
      this.onModalClose();
    };

    onSubmit = () => {
      const { isEditMode } = this.state;
      return isEditMode ? this.onSubmitEditData() : this.onAddData();
    };

    render() {
      const { showModal, isEditMode, isDetailMode, isFormValid, isLoaded } = this.state;
      return (
        <WrappedComponent
          onModalClose={this.onModalClose}
          showModal={showModal}
          isLoaded={isLoaded}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          isFormValid={isFormValid}
          onModalOpen={this.onModalOpen}
          onFormChange={this.onFormChange}
          onAddData={this.onAddData}
          onDeleteData={this.onDeleteData}
          onSubmit={this.onSubmit}
          onEditDataModalOpen={this.onEditDataModalOpen}
          onDataOpen={this.onDataOpen}
          onSubtaskModalOpen={this.onSubtaskModalOpen}
        />
      );
    }
  };

const mapStateToProps = ({ data: { members, formData, tasks, assignedMembers, progress }, auth: { user } }) => ({
  members,
  formData,
  user,
  tasks,
  assignedMembers,
  progress,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUsers,
      addUser,
      editUser,
      deleteUser,
      setFormData,
      getTasks,
      addTask,
      deleteTask,
      editTask,
      setAssignedMembers,
      getUserProgress,
      deleteUserProgress,
      editUserProgress,
      addUserProgress,
    },
    dispatch,
  );

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, withModal);

export default composedModalHOC;
