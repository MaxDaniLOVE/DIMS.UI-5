/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFormData } from '../store/actions';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import { Button } from '../UI/Buttons';
import ModalContent from '../UI/ModalContent';
import FormModal from '../components/FormModal';
import { defaultRegisterData } from '../utils/defaultInputsData';
import DataModal from '../components/DataModal';
import { membersInputs } from '../utils/inputs';
import pagesInitialState from '../utils/pagesInitialState';
import composedModalHOC from '../hoc/withModal';

class MembersPage extends Component {
  constructor() {
    super();
    this.state = {
      ...pagesInitialState,
    };
  }

  componentDidMount() {
    const { setFormData } = this.props;
    setFormData(defaultRegisterData);
  }

  render() {
    const {
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
    } = this.props;
    const modalHeader = isEditMode || isDetailMode ? <h3>{`${formData.name}'s details:`}</h3> : <h3>Add new user:</h3>;
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
              <Button customClass='with-margin' onClick={onModalOpen}>
                Register
              </Button>
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
  }
}

const mapStateToProps = ({ data: { members, formData }, auth: { user } }) => ({
  members,
  formData,
  user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setFormData }, dispatch);

MembersPage.propTypes = {
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setFormData: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default composedModalHOC(connect(mapStateToProps, mapDispatchToProps)(MembersPage), 'MEMBERS_PAGE');
