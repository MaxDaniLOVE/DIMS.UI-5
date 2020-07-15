/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Preloader from '../components/Preloader';
import { SuccessButton } from '../UI/Buttons';
import TasksTable from '../components/TasksTable';
import { defaultTaskData } from '../utils/defaultInputsData';
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
  setFormData,
  setAssignedMembers,
  resetSort,
  resetFilterData,
} from '../store/actions';
import { withModal } from '../hoc';
import { AddTaskIcon } from '../assets/icons';
import { DangerSubtitle, Subtitle } from '../UI/Titles';
import PageWrapper from '../UI/PageWrapper';

const TasksManagePage = ({
  tasks,
  isLoaded,
  onDeleteData,
  onEditDataModalOpen,
  onModalOpen,
  setFormData,
  onDataOpen,
  resetSort,
  resetFilterData,
}) => {
  useEffect(() => {
    setFormData(defaultTaskData);
    resetSort();
    resetFilterData('tasks');
  }, [setFormData, resetSort, resetFilterData]);
  if (!tasks.length && isLoaded) {
    return (
      <>
        <DangerSubtitle>Create your first task!</DangerSubtitle>
        <SuccessButton onClick={onModalOpen}>
          <AddTaskIcon />
        </SuccessButton>
      </>
    );
  }
  return (
    <PageWrapper>
      {isLoaded ? (
        <>
          <SuccessButton onClick={onModalOpen}>
            <AddTaskIcon />
          </SuccessButton>
          <Subtitle>All availiable tasks:</Subtitle>
          <TasksTable
            onDataOpen={onDataOpen}
            data={tasks}
            onDeleteTask={onDeleteData}
            onEditTaskModalOpen={onEditDataModalOpen}
          />
        </>
      ) : (
        <Preloader />
      )}
    </PageWrapper>
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
  resetSort: PropTypes.func.isRequired,
  resetFilterData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { tasks, formData, assignedMembers } }) => {
  return { tasks, formData, assignedMembers };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { resetSort, getTasks, addTask, deleteTask, editTask, setFormData, setAssignedMembers, resetFilterData },
    dispatch,
  );
};

export default withModal(connect(mapStateToProps, mapDispatchToProps)(TasksManagePage), 'TASK_PAGE');
