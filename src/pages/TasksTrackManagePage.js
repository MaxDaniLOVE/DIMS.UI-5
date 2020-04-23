import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { addCache, loadCache } from '../utils/cache';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { defaultSubtaskData } from '../utils/defaultInputsData';
import Modal from '../UI/Modal';
import DataModal from '../components/DataModal';
import { subtasksInputs } from '../utils/inputs';
import FormModal from '../components/FormModal';
import validation from '../utils/validation';

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
    const memberId = '1XMvbioNVdqnsLoLEYnc'; // TODO get memberId from store/context
    const cachedProgress = loadCache(`${memberId}_progress`);
    if (cachedProgress) {
      this.setState({
        progress: cachedProgress,
        isLoaded: true,
      });
    } else {
      this.getTracksData();
    }
  }

  getTracksData = async () => {
    const memberId = '1XMvbioNVdqnsLoLEYnc'; // TODO get memberId from store/context
    this.db.getUsersProgress(memberId).then((progress) => {
      progress.sort((a, b) => (a.trackDate > b.trackDate ? 1 : -1)); // sort from old to new
      addCache(`${memberId}_progress`, progress);
      this.setState({
        progress,
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
    this.setState(({ subtaskData }) => {
      const { taskId, taskName } = subtaskData;
      const inputsValues = inputsChangeHandler(value, id, subtaskData);
      const newSubtask = {
        taskId,
        taskName,
        userId: '1XMvbioNVdqnsLoLEYnc', // TODO get memberId from store/context
        userName: 'Armando Abbott', // TODO get memberId from store/context
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
    this.onModalClose();
    await this.db.addNewSubtask(subtask);
    await this.getTracksData();
  };

  onSubtaskDelete = async (subtaskId) => {
    await this.db.deleteSubtask(subtaskId);
    await this.getTracksData();
  };

  onEditSubtaskModalOpen = (subtaskId) => {
    const { progress } = this.state;
    const editedSubtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    this.onModalOpen();
    this.setState({
      subtaskData: { ...editedSubtask },
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditSubtask = async () => {
    const { subtaskData } = this.state;
    await this.db.editUserProgress(subtaskData);
    const result = await this.getTracksData();
    this.onModalClose();
    return result;
  };

  render() {
    const { progress, isLoaded, showModal, isEditMode, isDetailMode, subtaskData, isFormValid } = this.state;
    const modalHeader = <h3>{`Task track - ${subtaskData.taskName}`}</h3>;
    return (
      <div className='table-wrapper'>
        <Modal
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
            />
          )}
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

export default TasksTrackManagePage;
