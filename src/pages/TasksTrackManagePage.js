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
} from '../store/actions';
import { Subtitle, DangerSubtitle } from '../UI/Titles';
import composedModalHOC from '../hoc/withModal';
import { AddProgressButton } from '../UI/Buttons';

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
}) => {
  useEffect(() => {
    setFormData(defaultSubtaskData);
    getUserTasks(userId);
  }, [getUserTasks, setFormData, userId]);
  if (!progress.length && isLoaded) {
    return <DangerSubtitle>It looks like you have no subtasks!</DangerSubtitle>;
  }
  return (
    <div className='table-wrapper'>
      {isLoaded ? (
        <>
          <AddProgressButton onAddSubtaskModalOpen={onSubtaskModalOpen} />
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
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onEditDataModalOpen: PropTypes.func.isRequired,
  onDataOpen: PropTypes.func.isRequired,
  onSubtaskModalOpen: PropTypes.func.isRequired,
  getUserTasks: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
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
    { getUserProgress, setFormData, deleteUserProgress, editUserProgress, addUserProgress, getUserTasks },
    dispatch,
  );
};

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(TasksTrackManagePage), 'TRACK_PAGE');
