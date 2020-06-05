/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFormData } from '../store/actions';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import { SuccessButton } from '../UI/Buttons';
import { defaultRegisterData } from '../utils/defaultInputsData';
import composedModalHOC from '../hoc/withModal';
import { AddUserIcon } from '../assets/icons';
import { DangerSubtitle } from '../UI/Titles';

const MembersPage = ({
  members,
  user: { role },
  isLoaded,
  onDeleteData,
  onEditDataModalOpen,
  onDataOpen,
  onModalOpen,
  setFormData,
}) => {
  useEffect(() => {
    setFormData(defaultRegisterData);
  }, [setFormData]);
  if (!members.length && isLoaded) {
    return (
      <>
        <DangerSubtitle>Add your first student!</DangerSubtitle>
        <SuccessButton onClick={onModalOpen}>
          <AddUserIcon />
        </SuccessButton>
      </>
    );
  }
  return (
    <div className='table-wrapper'>
      {isLoaded ? (
        <>
          {role === 'ADMIN' ? (
            <SuccessButton onClick={onModalOpen}>
              <AddUserIcon />
            </SuccessButton>
          ) : null}
          <MembersTable
            members={members}
            onEditMemberModalOpen={onEditDataModalOpen}
            onMemberDataOpen={onDataOpen}
            onUserDelete={onDeleteData}
            role={role}
          />
        </>
      ) : (
        <Preloader />
      )}
    </div>
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
  return bindActionCreators({ setFormData }, dispatch);
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
};

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(MembersPage), 'MEMBERS_PAGE');
