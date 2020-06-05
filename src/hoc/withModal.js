/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import DeletingModal from '../components/DeletingModal';
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
  getAssignedMembers,
} from '../store/actions/dataActions';
import closingModalDelay from '../utils/closingModalDelay';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { validation } from '../utils/validation';
import transformEditData from '../utils/transformEditData';
import setModalPageData from '../utils/setModalPageData';
import findModalPageData from '../utils/findModalPageData';
import setMethods from '../utils/setMethods';
import DataModal from '../components/DataModal';
import ModalContent from '../UI/ModalContent';
import FormModal from '../components/FormModal';
import modalHeaders from '../utils/modalHeaders';

const withModal = (WrappedComponent, pageType) =>
  class ModalContainer extends Component {
    constructor(props) {
      super(props);
      this.getData = setMethods(props, pageType).GET;
      this.addData = setMethods(props, pageType).ADD;
      this.editData = setMethods(props, pageType).EDIT;
      this.deleteData = setMethods(props, pageType).DELETE;
      this.defaultInputsData = setMethods(props, pageType).DEFAULT_INPUTS;
      this.dataInputs = setMethods(props, pageType).DATA_INPUTS;
      this.state = {
        ...pagesInitialState,
        pageData: [],
        isOpenDeleteModal: false,
        deleteId: '',
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
      const pageData = setModalPageData(nextProps, pageType);
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
      const { setFormData, formData, userTasks } = this.props;
      const editedTask = userTasks.find(({ taskId: id }) => id === taskId);
      const { name: taskName } = editedTask;
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
        isFormValid = validation(validatedInputs, this.dataInputs);
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

    onDeleteModalOpen = (deleteId) => {
      this.setState({ isOpenDeleteModal: true, deleteId });
    };

    onDeleteModalClose = () => {
      this.setState({ isOpenDeleteModal: false, deleteId: '' });
    };

    onDeleteData = async () => {
      const {
        user: { userId },
      } = this.props;
      const { deleteId } = this.state;
      const response = await this.deleteData(deleteId, userId);
      this.onDeleteModalClose();
      return response;
    };

    onEditDataModalOpen = async (recievedId) => {
      const { setFormData, getAssignedMembers } = this.props;
      const { pageData } = this.state;
      const formData = transformEditData(pageType, pageData, recievedId);
      if (pageType === 'TASK_PAGE') {
        getAssignedMembers(recievedId);
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
      const dataToDisplay = findModalPageData(pageType, pageData, recievedId);
      setFormData(dataToDisplay);
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
      const { showModal, isEditMode, isDetailMode, isFormValid, isLoaded, isOpenDeleteModal } = this.state;
      const { isDarkMode, formData } = this.props;
      const modalHeader = modalHeaders(pageType, isEditMode, isDetailMode, formData);
      const formClassNames = {
        MEMBERS_PAGE: 'members-modal',
        TASK_PAGE: 'tasks-modal',
        TRACK_PAGE: 'tasks-track-modal',
      };
      return (
        <>
          <Modal isOpen={showModal} toggle={this.onModalClose}>
            <ModalContent
              showModal={showModal}
              isEditMode={isEditMode}
              isDetailMode={isDetailMode}
              onModalClose={this.onModalClose}
              isFormValid={isFormValid}
              onSubmit={this.onSubmit}
              isCheckboxShow={!isDetailMode && pageType === 'TASK_PAGE'}
            >
              {isDetailMode ? (
                <DataModal header={modalHeader} data={formData} inputFields={this.dataInputs} />
              ) : (
                <FormModal
                  addClassName={formClassNames[pageType]}
                  inputs={this.dataInputs}
                  data={formData}
                  onFormChange={this.onFormChange}
                  isEditMode={isEditMode}
                  isFormValid={isFormValid}
                  modalHeader={modalHeader}
                />
              )}
            </ModalContent>
          </Modal>
          <DeletingModal
            isOpen={isOpenDeleteModal}
            onCloseModal={this.onDeleteModalClose}
            onDeleteData={this.onDeleteData}
            isDarkMode={isDarkMode}
          >
            Are you sure that want to delete this field?
          </DeletingModal>
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
            onDeleteData={this.onDeleteModalOpen}
            onSubmit={this.onSubmit}
            onEditDataModalOpen={this.onEditDataModalOpen}
            onDataOpen={this.onDataOpen}
            onSubtaskModalOpen={this.onSubtaskModalOpen}
          />
        </>
      );
    }
  };

const mapStateToProps = ({
  data: { members, isDarkMode, formData, tasks, assignedMembers, progress, userTasks },
  auth: { user },
}) => ({
  members,
  formData,
  user,
  tasks,
  assignedMembers,
  progress,
  isDarkMode,
  userTasks,
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
      getAssignedMembers,
    },
    dispatch,
  );

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, withModal);

export default composedModalHOC;
