/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { defaultSubtaskData } from '../utils/defaultInputsData';
import ModalContent from '../UI/ModalContent';
import DataModal from '../components/DataModal';
import { subtasksInputs } from '../utils/inputs';
import FormModal from '../components/FormModal';
import EmptyTableMessage from '../UI/EmptyTableMessage';
import { getUserProgress, setFormData, deleteUserProgress, editUserProgress, addUserProgress } from '../store/actions';
import { Subtitle } from '../UI/Titles';
import composedModalHOC from '../hoc/withModal';

const TasksTrackManagePage = ({
  progress,
  formData,
  isLoaded,
  showModal,
  isEditMode,
  isDetailMode,
  isFormValid,
  onFormChange,
  onDeleteData,
  onSubmit,
  onEditDataModalOpen,
  onModalClose,
  onDataOpen,
  onSubtaskModalOpen,
  setFormData,
}) => {
  useEffect(() => {
    setFormData(defaultSubtaskData);
  }, [setFormData]);
  const modalHeader = <h3>{`Task track - ${formData.taskName}`}</h3>;
  if (!progress.length) {
    return <EmptyTableMessage>It looks like you have no subtasks!</EmptyTableMessage>;
  }
  return (
    <div className='table-wrapper'>
      <Modal isOpen={showModal} toggle={onModalClose}>
        <ModalContent
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={onModalClose}
          isFormValid={isFormValid}
          onSubmit={onSubmit}
        >
          {isDetailMode ? (
            <DataModal header={modalHeader} data={formData} inputFields={subtasksInputs} />
          ) : (
            <FormModal
              addClassName='tasks-track-modal'
              inputs={subtasksInputs}
              data={formData}
              onFormChange={onFormChange}
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
            onAddSubtaskModalOpen={onSubtaskModalOpen}
            progress={progress}
            isMemberTasks
            onSubtaskDataOpen={onDataOpen}
            onSubtaskDelete={onDeleteData}
            onEditSubtaskModalOpen={onEditDataModalOpen}
          />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

TasksTrackManagePage.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isDetailMode: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEditDataModalOpen: PropTypes.func.isRequired,
  onDataOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSubtaskModalOpen: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { progress, formData }, auth: { user } }) => ({
  progress,
  formData,
  user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserProgress, setFormData, deleteUserProgress, editUserProgress, addUserProgress }, dispatch);

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(TasksTrackManagePage), 'TRACK_PAGE');
