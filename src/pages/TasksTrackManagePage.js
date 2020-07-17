/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { defaultSubtaskData } from '../utils/defaultInputsData';
import {
  getUserProgress,
  setFormData,
  deleteUserProgress,
  editUserProgress,
  addUserProgress,
  getUserTasks,
  resetSort,
  setFilterData,
} from '../store/actions';
import { Subtitle, DangerSubtitle } from '../UI/Titles';
import { withModal } from '../hoc';
import { AddProgressButton } from '../UI/Buttons';
import PageWrapper from '../UI/PageWrapper';

const TasksTrackManagePage = ({
  progress,
  isLoaded,
  onDeleteData,
  onEditDataModalOpen,
  onDataOpen,
  onSubtaskModalOpen,
  setFormData,
  getUserTasks,
  userId,
  resetSort,
  setFilterData,
}) => {
  useEffect(() => {
    setFormData(defaultSubtaskData);
    getUserTasks(userId);
    resetSort();
    setFilterData('progress', progress);
  }, [getUserTasks, setFormData, userId, resetSort, setFilterData, progress]);
  if (!progress.length && isLoaded) {
    return (
      <>
        <DangerSubtitle>It looks like you have no subtasks!</DangerSubtitle>
        <AddProgressButton onAddSubtaskModalOpen={onSubtaskModalOpen} />
      </>
    );
  }
  return (
    <PageWrapper>
      {isLoaded ? (
        <>
          <AddProgressButton onAddSubtaskModalOpen={onSubtaskModalOpen} />
          <Subtitle>This is your subtasks:</Subtitle>
          <MembersProgressTable
            onAddSubtaskModalOpen={onSubtaskModalOpen}
            data={progress}
            isMemberTasks
            onSubtaskDataOpen={onDataOpen}
            onSubtaskDelete={onDeleteData}
            onEditSubtaskModalOpen={onEditDataModalOpen}
            userId={userId}
          />
        </>
      ) : (
        <Preloader />
      )}
    </PageWrapper>
  );
};

TasksTrackManagePage.propTypes = {
  setFormData: PropTypes.func.isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onEditDataModalOpen: PropTypes.func.isRequired,
  onDataOpen: PropTypes.func.isRequired,
  onSubtaskModalOpen: PropTypes.func.isRequired,
  getUserTasks: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  resetSort: PropTypes.func.isRequired,
  setFilterData: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  data: { progress, formData, userTasks },
  auth: {
    user: { userId },
  },
}) => {
  return {
    progress,
    formData,
    userId,
    userTasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resetSort,
      getUserProgress,
      setFormData,
      deleteUserProgress,
      editUserProgress,
      addUserProgress,
      getUserTasks,
      setFilterData,
    },
    dispatch,
  );
};

export default withModal(connect(mapStateToProps, mapDispatchToProps)(TasksTrackManagePage), 'TRACK_PAGE');
