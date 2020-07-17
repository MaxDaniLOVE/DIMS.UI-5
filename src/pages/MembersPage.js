/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFormData, resetSort } from '../store/actions';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import { AddUserButton } from '../UI/Buttons';
import { defaultRegisterData } from '../utils/defaultInputsData';
import { withModal } from '../hoc';
import { DangerSubtitle, Subtitle } from '../UI/Titles';
import PageWrapper from '../UI/PageWrapper';

const MembersPage = ({
  members,
  user: { role },
  isLoaded,
  onDeleteData,
  onEditDataModalOpen,
  onDataOpen,
  onModalOpen,
  setFormData,
  resetSort,
}) => {
  useEffect(() => {
    setFormData(defaultRegisterData);
    resetSort();
  }, [setFormData, resetSort]);

  const isAdmin = role === 'ADMIN';
  const emptyTableSubtitle = isAdmin ? 'Add your first student!' : 'Sorry, but only admin can add new users:(';
  if (!members.length && isLoaded) {
    return (
      <>
        <DangerSubtitle>{emptyTableSubtitle}</DangerSubtitle>
        <AddUserButton onClick={onModalOpen} />
      </>
    );
  }
  return (
    <PageWrapper>
      {isLoaded ? (
        <>
          <AddUserButton onClick={onModalOpen} />
          <Subtitle>All Dev-Incubator students:</Subtitle>
          <MembersTable
            data={members}
            onEditMemberModalOpen={onEditDataModalOpen}
            onMemberDataOpen={onDataOpen}
            onUserDelete={onDeleteData}
            role={role}
          />
        </>
      ) : (
        <Preloader />
      )}
    </PageWrapper>
  );
};

const mapStateToProps = ({ data: { members, formData }, auth: { user } }) => {
  return {
    members,
    formData,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFormData, resetSort }, dispatch);
};

MembersPage.propTypes = {
  setFormData: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onEditDataModalOpen: PropTypes.func.isRequired,
  onDataOpen: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
};

export default withModal(connect(mapStateToProps, mapDispatchToProps)(MembersPage), 'MEMBERS_PAGE');
