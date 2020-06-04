/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFormData } from '../store/actions';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import { SuccessButton } from '../UI/Buttons';
import ModalContent from '../UI/ModalContent';
import FormModal from '../components/FormModal';
import { defaultRegisterData } from '../utils/defaultInputsData';
import DataModal from '../components/DataModal';
import { membersInputs } from '../utils/inputs';
import composedModalHOC from '../hoc/withModal';
import { AddUserIcon } from '../assets/icons';

const MembersPage = ({
  members,
  formData,
  user: { role },
  isLoaded,
  showModal,
  isEditMode,
  isDetailMode,
  isFormValid,
  onFormChange,
  onDeleteData,
  onSubmit,
  onEditDataModalOpen,
  onDataOpen,
  onModalClose,
  onModalOpen,
  setFormData,
}) => {
  useEffect(() => {
    setFormData(defaultRegisterData);
  }, [setFormData]);
  const modalHeader = isEditMode || isDetailMode ? <h3>User&apos;s details:</h3> : <h3>Add new user:</h3>;
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
            <DataModal header={modalHeader} data={formData} inputFields={membersInputs} />
          ) : (
            <FormModal
              addClassName='members-modal'
              inputs={membersInputs}
              data={formData}
              onFormChange={onFormChange}
              isEditMode={isEditMode}
              modalHeader={modalHeader}
            />
          )}
        </ModalContent>
      </Modal>
      {isLoaded ? (
        <>
          {role === 'ADMIN' ? (
            <SuccessButton customClass='with-margin' onClick={onModalOpen}>
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
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setFormData: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
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
  onModalOpen: PropTypes.func.isRequired,
};

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(MembersPage), 'MEMBERS_PAGE');
