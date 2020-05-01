import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { defaultSubtaskData } from '../utils/defaultInputsData';
import ModalContent from '../UI/Modal';
import DataModal from '../components/DataModal';
import { subtasksInputs } from '../utils/inputs';
import sortFromOldToNew from '../utils/sortFromOldToNew';
import FormModal from '../components/FormModal';
import validation from '../utils/validation';
import AuthContext from '../context';
import { stringToDate, dateToString } from '../utils/convertDate';

class TasksTrackManagePage extends Component {
  constructor() {
    super();
    this.state = {
      progress: [],
      isLoaded: false,
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      subtaskData: defaultSubtaskData,
      isFormValid: false,
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    const { match } = this.props;
    const {
      params: { tid },
    } = match;
    this.getTracksData(tid);
  }

  getTracksData = async (recievedId) => {
    const { user } = this.context;
    const { userId } = user;
    this.db.getUsersProgress(userId).then(async (progress) => {
      const sortedProgress = sortFromOldToNew(progress);
      if (recievedId) {
        const editedTask = sortedProgress.find(({ taskId }) => taskId === recievedId);
        const { taskId, taskName } = editedTask;
        this.onAddSubtaskModalOpen(taskId, taskName);
      }
      this.setState({
        progress: sortedProgress,
        isLoaded: true,
      });
    });
  };

  onModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      subtaskData: defaultSubtaskData,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onSubtaskDataOpen = (subtaskId) => {
    const { progress } = this.state;
    const subtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    this.onModalOpen();
    this.setState({
      subtaskData: { ...subtask },
      isDetailMode: true,
    });
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    const { user } = this.context;
    this.setState(({ subtaskData }) => {
      const { taskId, taskName } = subtaskData;
      const inputsValues = inputsChangeHandler(value, id, subtaskData);
      const newSubtask = {
        taskId,
        taskName,
        userId: user.userId,
        userName: user.userName,
        ...inputsValues,
      };
      const validatedInputs = {
        trackNote: newSubtask.trackNote,
        trackDate: newSubtask.trackDate,
      };
      const isFormValid = validation(validatedInputs, subtasksInputs);
      return { subtaskData: newSubtask, isFormValid };
    });
  };

  onAddSubtaskModalOpen = (taskId, taskName) => {
    this.onModalOpen();
    this.setState(({ subtaskData }) => ({
      subtaskData: { ...subtaskData, taskId, taskName },
    }));
  };

  onAddSubtask = async (subtask) => {
    const { trackDate } = subtask;
    const newSubtask = { ...subtask, trackDate: stringToDate(trackDate) };
    this.onModalClose();
    await this.db.addNewSubtask(newSubtask);
    await this.getTracksData();
  };

  onSubtaskDelete = async (subtaskId) => {
    await this.db.deleteSubtask(subtaskId);
    await this.getTracksData();
  };

  onEditSubtaskModalOpen = (subtaskId) => {
    const { progress } = this.state;
    const editedSubtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    const { trackDate } = editedSubtask;
    this.onModalOpen();
    this.setState({
      subtaskData: { ...editedSubtask, trackDate: dateToString(trackDate) },
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditSubtask = async (subtask) => {
    const { trackDate } = subtask;
    const newSubtask = { ...subtask, trackDate: stringToDate(trackDate) };
    await this.db.editUserProgress(newSubtask);
    const result = await this.getTracksData();
    this.onModalClose();
    return result;
  };

  render() {
    const { progress, isLoaded, showModal, isEditMode, isDetailMode, subtaskData, isFormValid } = this.state;
    const modalHeader = <h3>{`Task track - ${subtaskData.taskName}`}</h3>;
    return (
      <div className='table-wrapper'>
        <Modal isOpen={showModal} toggle={this.onModalClose}>
          <ModalContent
            showModal={showModal}
            isEditMode={isEditMode}
            isDetailMode={isDetailMode}
            onModalClose={this.onModalClose}
            isFormValid={isFormValid}
            onSubmit={() => (isEditMode ? this.onSubmitEditSubtask(subtaskData) : this.onAddSubtask(subtaskData))}
          >
            {isDetailMode ? (
              <DataModal header={modalHeader} data={subtaskData} inputFields={subtasksInputs} />
            ) : (
              <FormModal
                inputs={subtasksInputs}
                data={subtaskData}
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
            <h2>This is your tasks:</h2>
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
};

export default TasksTrackManagePage;
