/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import Preloader from '../components/Preloader';
import { Button } from '../UI/Buttons';
import TasksTable from '../components/TasksTable';
import { defaultTaskData } from '../utils/defaultInputsData';
import { tasksInputs } from '../utils/inputs';
import ModalContent from '../UI/ModalContent';
import DataModal from '../components/DataModal';
import FormModal from '../components/FormModal';
import { getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers } from '../store/actions';
import composedModalHOC from '../hoc/withModal';

const TasksManagePage = ({
  tasks,
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
  onModalOpen,
  setFormData,
}) => {
  useEffect(() => {
    setFormData(defaultTaskData);
  }, [setFormData]);
  const modalHeader = isEditMode || isDetailMode ? <h3>Task&apos;s details:</h3> : <h3>Add new task:</h3>;
  return (
    <div className='table-wrapper'>
      <Modal isOpen={showModal} toggle={onModalClose}>
        <ModalContent
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={onModalClose}
          isFormValid={isFormValid}
          isCheckboxShow
          onSubmit={onSubmit}
        >
          {isDetailMode ? (
            <DataModal header={modalHeader} data={formData} inputFields={tasksInputs} />
          ) : (
            <FormModal
              addClassName='tasks-modal'
              modalHeader={modalHeader}
              inputs={tasksInputs}
              data={formData}
              onFormChange={onFormChange}
              isEditMode={isEditMode}
              isFormValid={isFormValid}
            />
          )}
        </ModalContent>
      </Modal>
      {isLoaded ? (
        <>
          <Button onClick={onModalOpen}>Create</Button>
          <TasksTable tasks={tasks} onDeleteTask={onDeleteData} onEditTaskModalOpen={onEditDataModalOpen} />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

TasksManagePage.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isDetailMode: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEditDataModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { tasks, formData, assignedMembers } }) => {
  return { tasks, formData, assignedMembers };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers }, dispatch);
};

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(TasksManagePage), 'TASK_PAGE');
