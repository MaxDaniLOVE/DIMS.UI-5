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
} from '../store/actions/dataActions';
import closingModalDelay from '../utils/closingModalDelay';
import { defaultRegisterData, defaultTaskData } from '../utils/defaultInputsData';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { membersInputs, tasksInputs } from '../utils/inputs';
import { validation } from '../utils/validation';
import { dateToString } from '../utils/convertDate';
import Firebase from '../services/Firebase';

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
      const { match } = this.props;
      const {
        params: { tid },
      } = match;
      this.fetchData(tid);
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

    fetchData = async (tid) => {
      await this.getData();
      this.setState({
        isLoaded: true,
      });
      if (tid) {
        await this.onEditDataModalOpen(tid);
      }
    };

    onModalOpen = () => {
      this.setState({
        showModal: true,
      });
    };

    onModalClose = () => {
      const { setFormData } = this.props;
      closingModalDelay(this, this.defaultInputsData, setFormData);
    };

    onFormChange = (e) => {
      const { setFormData, formData } = this.props;
      const { value, id } = e.target;
      const updated = inputsChangeHandler(value, id, formData);
      const validatedInputs = { ...updated };
      const isFormValid = validation(validatedInputs, this.dataInputs);
      setFormData(updated);
      this.setState({ isFormValid });
    };

    onAddData = async () => {
      await this.addData();
      this.onModalClose();
    };

    onDeleteData = async (id) => {
      const response = await this.deleteData(id);
      return response;
    };

    onEditDataModalOpen = async (recievedId) => {
      const { setFormData, setAssignedMembers } = this.props; // TODO FIX
      const { pageData } = this.state;
      if (pageType === 'MEMBERS_PAGE') {
        const editedData = pageData.find(({ id }) => id === recievedId);
        const { birthDate, startDate } = editedData;
        this.onModalOpen();
        setFormData({ ...editedData, birthDate: dateToString(birthDate), startDate: dateToString(startDate) });
      }
      if (pageType === 'TASK_PAGE') {
        const editedData = pageData.find(({ taskId }) => taskId === recievedId);
        const assignedMembers = await db.getAssignedUsers(recievedId); // TODO move to the appropriate handler
        setAssignedMembers(assignedMembers);
        const { deadlineDate, startDate } = editedData;
        this.onModalOpen();
        setFormData({ ...editedData, deadlineDate: dateToString(deadlineDate), startDate: dateToString(startDate) });
      }

      return this.setState({
        isEditMode: true,
        isFormValid: true,
      });
    };

    onDataOpen = (userId) => {
      const { members, setFormData } = this.props;
      const editedUser = members.find(({ id }) => id === userId); // TODO FIX
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
    },
    dispatch,
  );

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, withModal);

export default composedModalHOC;
