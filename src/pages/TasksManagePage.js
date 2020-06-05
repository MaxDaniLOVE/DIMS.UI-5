/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Preloader from '../components/Preloader';
import { SuccessButton } from '../UI/Buttons';
import TasksTable from '../components/TasksTable';
import { defaultTaskData } from '../utils/defaultInputsData';
import { getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers } from '../store/actions';
import composedModalHOC from '../hoc/withModal';
import { AddTaskIcon } from '../assets/icons';
import { DangerSubtitle } from '../UI/Titles';

const TasksManagePage = ({
  tasks,
  isLoaded,
  onDeleteData,
  onEditDataModalOpen,
  onModalOpen,
  setFormData,
  onDataOpen,
}) => {
  useEffect(() => {
    setFormData(defaultTaskData);
  }, [setFormData]);
  if (!tasks.length && isLoaded) {
    return <DangerSubtitle>Create your first task!</DangerSubtitle>;
  }
  return (
    <div className='table-wrapper'>
      {isLoaded ? (
        <>
          <SuccessButton onClick={onModalOpen}>
            <AddTaskIcon />
          </SuccessButton>
          <TasksTable
            onDataOpen={onDataOpen}
            tasks={tasks}
            onDeleteTask={onDeleteData}
            onEditTaskModalOpen={onEditDataModalOpen}
          />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

TasksManagePage.propTypes = {
  setFormData: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onEditDataModalOpen: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onDataOpen: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { tasks, formData, assignedMembers } }) => {
  return { tasks, formData, assignedMembers };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers }, dispatch);
};

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(TasksManagePage), 'TASK_PAGE');
