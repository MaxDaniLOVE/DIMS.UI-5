import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { addCache, loadCache } from '../utils/cache';
import { defaultSubtaskData, inputsParser } from '../utils/inputsParser';
import Modal from '../UI/Modal';
import DataModal from '../components/DataModal';
import { subtasksInputs } from '../utils/inputs';
import FormModal from '../components/FormModal';

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
      const newSubtask = {
        taskId,
        taskName,
        userId: '1XMvbioNVdqnsLoLEYnc', // TODO get memberId from store/context
        userName: 'Armando Abbott', // TODO get memberId from store/context
        ...inputsParser(value, id, subtaskData),
      };
      return { subtaskData: newSubtask };
    });
  };

  onAddSubtaskModalOpen = (taskId, taskName) => {
    this.onModalOpen();
    this.setState(({ subtaskData }) => ({
      subtaskData: { ...subtaskData, taskId, taskName },
    }));
  };

  onAddSubtask = async (subtask) => {
    await this.db.addNewSubtask(subtask);
    await this.getTracksData();
  };

  onSubtaskDelete = async (subtaskId) => {
    await this.db.deleteSubtask(subtaskId);
    await this.getTracksData();
  };

  render() {
    const { progress, isLoaded, showModal, isEditMode, isDetailMode, subtaskData } = this.state;
    const modalHeader = <h3>{`Task track - ${subtaskData.taskName}`}</h3>;
    return (
      <div className='table-wrapper'>
        <Modal
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={this.onModalClose}
          onSubmit={() => (isEditMode ? this.onSubmitEditUser(subtaskData) : this.onAddSubtask(subtaskData))}
        >
          {isDetailMode ? (
            <DataModal header={modalHeader} data={subtaskData} inputFields={subtasksInputs} />
          ) : (
            <FormModal
              inputs={subtasksInputs}
              data={subtaskData}
              onFormChange={this.onFormChange}
              isEditMode={isEditMode}
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
