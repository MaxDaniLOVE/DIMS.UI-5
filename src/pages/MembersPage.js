/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers, addUser, editUser, deleteUser, setFormData } from '../store/actions';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import { Button } from '../UI/Buttons';
import { addCache } from '../utils/cache';
import ModalContent from '../UI/ModalContent';
import FormModal from '../components/FormModal';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { defaultRegisterData } from '../utils/defaultInputsData';
import DataModal from '../components/DataModal';
import { membersInputs } from '../utils/inputs';
import { validation } from '../utils/validation';
import { dateToString } from '../utils/convertDate';
import pagesInitialState from '../utils/pagesInitialState';

class MembersPage extends Component {
  constructor() {
    super();
    this.state = {
      ...pagesInitialState,
    };
  }

  componentDidMount() {
    this.getMembersData();
    const { setFormData } = this.props;
    setFormData(defaultRegisterData);
  }

  componentDidUpdate() {
    const { members } = this.props;
    addCache('members', members);
  }

  getMembersData = async () => {
    const { getUsers } = this.props;
    await getUsers();
    this.setState({
      isLoaded: true,
    });
  };

  onModalOpen = () => {
    return this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    const { setFormData } = this.props;
    setFormData(defaultRegisterData);
    this.setState({
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onFormChange = (e) => {
    const { setFormData, formData } = this.props;
    const { value, id } = e.target;
    const updated = inputsChangeHandler(value, id, formData);
    const validatedInputs = { ...updated };
    const isFormValid = validation(validatedInputs, membersInputs);
    setFormData(updated);
    this.setState({ isFormValid });
  };

  onAddNewMember = async () => {
    const { addUser } = this.props;
    await addUser();
    this.onModalClose();
  };

  onEditMemberModalOpen = (userId) => {
    const { members, setFormData } = this.props;
    const editedUser = members.find(({ id }) => id === userId);
    const { birthDate, startDate } = editedUser;
    this.onModalOpen();
    setFormData({ ...editedUser, birthDate: dateToString(birthDate), startDate: dateToString(startDate) });
    return this.setState({
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditUser = async () => {
    const { editUser } = this.props;
    await editUser();
    this.onModalClose();
  };

  onMemberDataOpen = (userId) => {
    const { members, setFormData } = this.props;
    const editedUser = members.find(({ id }) => id === userId);
    setFormData(editedUser);
    this.setState({
      showModal: true,
      isDetailMode: true,
    });
  };

  onUserDelete = async (userId) => {
    const { deleteUser } = this.props;
    const response = await deleteUser(userId);
    return response;
  };

  onSubmit = () => {
    const { isEditMode } = this.state;
    return isEditMode ? this.onSubmitEditUser() : this.onAddNewMember();
  };

  render() {
    const { isLoaded, showModal, isEditMode, isDetailMode, isFormValid } = this.state;
    const {
      members,
      formData,
      user: { role },
    } = this.props;
    const modalHeader = isEditMode || isDetailMode ? <h3>{`${formData.name}'s details:`}</h3> : <h3>Add new user:</h3>;
    return (
      <div className='table-wrapper'>
        <Modal isOpen={showModal} toggle={this.onModalClose}>
          <ModalContent
            showModal={showModal}
            isEditMode={isEditMode}
            isDetailMode={isDetailMode}
            onModalClose={this.onModalClose}
            isFormValid={isFormValid}
            onSubmit={this.onSubmit}
          >
            {isDetailMode ? (
              <DataModal header={modalHeader} data={formData} inputFields={membersInputs} />
            ) : (
              <FormModal
                addClassName='members-modal'
                inputs={membersInputs}
                data={formData}
                onFormChange={this.onFormChange}
                isEditMode={isEditMode}
                modalHeader={modalHeader}
              />
            )}
          </ModalContent>
        </Modal>
        {isLoaded ? (
          <>
            {role === 'ADMIN' ? (
              <Button customClass='with-margin' onClick={this.onModalOpen}>
                Register
              </Button>
            ) : null}
            <MembersTable
              members={members}
              onEditMemberModalOpen={this.onEditMemberModalOpen}
              onMemberDataOpen={this.onMemberDataOpen}
              onUserDelete={this.onUserDelete}
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUsers, addUser, editUser, deleteUser, setFormData }, dispatch);

MembersPage.propTypes = {
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setFormData: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
