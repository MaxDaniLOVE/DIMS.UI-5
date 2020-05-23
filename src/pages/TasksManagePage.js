/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
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
import pagesInitialState from '../utils/pagesInitialState';
import composedModalHOC from '../hoc/withModal';

class TasksManagePage extends Component {
  constructor() {
    super();
    this.state = {
      ...pagesInitialState,
    };
  }

  componentDidMount() {
    const { setFormData } = this.props;
    setFormData(defaultTaskData);
  }

  render() {
    const {
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
    } = this.props;
    const modalHeader = isEditMode || isDetailMode ? <h3>{`Task - ${formData.name}:`}</h3> : <h3>Add new task:</h3>;
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
  }
}

TasksManagePage.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ data: { tasks, formData, assignedMembers } }) => ({ tasks, formData, assignedMembers });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers }, dispatch);

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(TasksManagePage), 'TASK_PAGE');
