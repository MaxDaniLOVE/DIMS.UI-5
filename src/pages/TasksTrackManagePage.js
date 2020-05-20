/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { defaultSubtaskData } from '../utils/defaultInputsData';
import ModalContent from '../UI/ModalContent';
import DataModal from '../components/DataModal';
import { subtasksInputs } from '../utils/inputs';
import FormModal from '../components/FormModal';
import { validation } from '../utils/validation';
import AuthContext from '../context';
import { dateToString } from '../utils/convertDate';
import pagesInitialState from '../utils/pagesInitialState';
import EmptyTableMessage from '../UI/EmptyTableMessage';
import { getUserProgress, setFormData, deleteUserProgress, editUserProgress, addUserProgress } from '../store/actions';
import { Subtitle } from '../UI/Titles';

class TasksTrackManagePage extends Component {
  constructor() {
    super();
    this.state = {
      ...pagesInitialState,
    };
  }

  componentDidMount() {
    const { match, setFormData } = this.props;
    const {
      params: { tid },
    } = match;
    setFormData(defaultSubtaskData);
    this.getTracksData(tid);
  }

  getTracksData = async (recievedId) => {
    const {
      user: { userId },
    } = this.context;
    const { getUserProgress } = this.props;
    await getUserProgress(userId);
    this.setState({
      isLoaded: true,
    });
    if (recievedId) {
      this.onAddSubtaskModalOpen(recievedId);
    }
  };

  onModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    const { setFormData } = this.props;
    setFormData(defaultSubtaskData);
    this.setState({
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onSubtaskDataOpen = (subtaskId) => {
    const { progress, setFormData } = this.props;
    const subtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    this.onModalOpen();
    setFormData(subtask);
    this.setState({
      isDetailMode: true,
    });
  };

  onFormChange = (e) => {
    const { setFormData, formData } = this.props;
    const { value, id } = e.target;
    const {
      user: { userId, userName },
    } = this.context;

    const { taskId, taskName } = formData;
    const inputsValues = inputsChangeHandler(value, id, formData);
    const newSubtask = {
      taskId,
      taskName,
      userId,
      userName,
      ...inputsValues,
    };

    const validatedInputs = {
      trackNote: newSubtask.trackNote,
      trackDate: newSubtask.trackDate,
    };

    const isFormValid = validation(validatedInputs, subtasksInputs);
    setFormData(newSubtask);
    this.setState({ isFormValid });
  };

  onAddSubtaskModalOpen = (taskId) => {
    const { progress, setFormData, formData } = this.props;
    const editedTask = progress.find(({ taskId: id }) => id === taskId);
    const { taskName } = editedTask;
    this.onModalOpen();
    setFormData({ ...formData, taskId, taskName });
  };

  onAddSubtask = async () => {
    const { addUserProgress } = this.props;
    await addUserProgress();
    this.onModalClose();
  };

  onSubtaskDelete = async (subtaskId) => {
    const { deleteUserProgress } = this.props;
    const {
      user: { userId },
    } = this.context;
    await deleteUserProgress(subtaskId, userId);
  };

  onEditSubtaskModalOpen = (subtaskId) => {
    const { progress, setFormData } = this.props;
    const editedSubtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    const { trackDate } = editedSubtask;
    this.onModalOpen();
    setFormData({ ...editedSubtask, trackDate: dateToString(trackDate) });
    this.setState({
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditSubtask = async () => {
    const { editUserProgress } = this.props;
    await editUserProgress();
    this.onModalClose();
  };

  onSubmit = () => {
    const { isEditMode } = this.state;
    return isEditMode ? this.onSubmitEditSubtask() : this.onAddSubtask();
  };

  render() {
    const { isLoaded, showModal, isEditMode, isDetailMode, isFormValid } = this.state;
    const { progress, formData } = this.props;
    const modalHeader = <h3>{`Task track - ${formData.taskName}`}</h3>;
    if (!progress.length) {
      return <EmptyTableMessage>It looks like you have no subtasks!</EmptyTableMessage>;
    }
    return (
      <div className='table-wrapper'>
        <Modal isOpen={showModal} toggle={this.onModalClose}>
          <ModalContent
            showModal={showModal}
            isEditMode={isEditMode}
            isDetailMode={isDetailMode}
            onModalClose={this.onModalClose}
            isFormValid={isFormValid}
            onSubmit={this.onSubmit}
          >
            {isDetailMode ? (
              <DataModal header={modalHeader} data={formData} inputFields={subtasksInputs} />
            ) : (
              <FormModal
                addClassName='tasks-track-modal'
                inputs={subtasksInputs}
                data={formData}
                onFormChange={this.onFormChange}
                isEditMode={isEditMode}
                isFormValid={isFormValid}
                modalHeader={modalHeader}
              />
            )}
          </ModalContent>
        </Modal>

        {isLoaded ? (
          <>
            <Subtitle>This is your subtasks:</Subtitle>
            <MembersProgressTable
              onAddSubtaskModalOpen={this.onAddSubtaskModalOpen}
              progress={progress}
              isMemberTasks
              onSubtaskDataOpen={this.onSubtaskDataOpen}
              onSubtaskDelete={this.onSubtaskDelete}
              onEditSubtaskModalOpen={this.onEditSubtaskModalOpen}
            />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

TasksTrackManagePage.contextType = AuthContext;

TasksTrackManagePage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getUserProgress: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  deleteUserProgress: PropTypes.func.isRequired,
  editUserProgress: PropTypes.func.isRequired,
  addUserProgress: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ progress, formData }) => ({ progress, formData });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserProgress, setFormData, deleteUserProgress, editUserProgress, addUserProgress }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TasksTrackManagePage);
