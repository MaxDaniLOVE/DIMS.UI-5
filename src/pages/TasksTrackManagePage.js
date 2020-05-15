import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import Firebase from '../services/Firebase';
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
import { stringToDate, dateToString } from '../utils/convertDate';
import pagesInitialState from '../utils/pagesInitialState';
import { getUserProgress, setFormData } from '../store/actions';

class TasksTrackManagePage extends Component {
  constructor() {
    super();
    this.state = {
      ...pagesInitialState,
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    const { match, setSubtaskData } = this.props;
    const {
      params: { tid },
    } = match;
    setSubtaskData(defaultSubtaskData);
    this.getTracksData(tid);
  }

  getTracksData = async (recievedId) => {
    const {
      user: { userId },
    } = this.context;
    const { getUserSubtasks } = this.props;
    await getUserSubtasks(userId);
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
    const { setSubtaskData } = this.props;
    setSubtaskData(defaultSubtaskData);
    this.setState({
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onSubtaskDataOpen = (subtaskId) => {
    const { progress, setSubtaskData } = this.props;
    const subtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    this.onModalOpen();
    setSubtaskData(subtask);
    this.setState({
      isDetailMode: true,
    });
  };

  onFormChange = (e) => {
    const { setSubtaskData, formData } = this.props;
    const { value, id } = e.target;
    const {
      user: { userId, userName },
    } = this.context;
    this.setState(() => {
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
      setSubtaskData(newSubtask);
      return { isFormValid };
    });
  };

  onAddSubtaskModalOpen = (taskId) => {
    const { progress, setSubtaskData, formData } = this.props;
    const editedTask = progress.find(({ taskId: id }) => id === taskId);
    const { taskName } = editedTask;
    this.onModalOpen();
    setSubtaskData({ ...formData, taskId, taskName });
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
    const { progress, setSubtaskData } = this.props;
    const editedSubtask = progress.find(({ taskTrackId }) => taskTrackId === subtaskId);
    const { trackDate } = editedSubtask;
    this.onModalOpen();
    setSubtaskData({ ...editedSubtask, trackDate: dateToString(trackDate) });
    this.setState({
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

  onSubmit = () => {
    const { isEditMode } = this.state;
    const { formData } = this.props;
    return isEditMode ? this.onSubmitEditSubtask(formData) : this.onAddSubtask(formData);
  };

  render() {
    const { isLoaded, showModal, isEditMode, isDetailMode, isFormValid } = this.state;
    const { progress, formData } = this.props;
    const modalHeader = <h3>{`Task track - ${formData.taskName}`}</h3>;
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
  getUserSubtasks: PropTypes.func.isRequired,
  setSubtaskData: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ progress, formData }) => ({ progress, formData });

const mapDispatchToProps = (dispatch) => {
  return {
    getUserSubtasks: (id) => dispatch(getUserProgress(id)),
    setSubtaskData: (data) => dispatch(setFormData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TasksTrackManagePage);
