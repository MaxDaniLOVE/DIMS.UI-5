import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
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
import AuthContext from '../context';
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
    const { setRegisterData } = this.props;
    setRegisterData(defaultRegisterData);
  }

  componentDidUpdate() {
    const { members } = this.props;
    addCache('members', members);
  }

  getMembersData = async () => {
    const { getUsersData } = this.props;
    await getUsersData();
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
    const { setRegisterData } = this.props;
    setRegisterData(defaultRegisterData);
    this.setState({
      showModal: false,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onFormChange = (e) => {
    const { setRegisterData, formData } = this.props;
    const { value, id } = e.target;
    const updated = inputsChangeHandler(value, id, formData);
    const validatedInputs = { ...updated };
    const isFormValid = validation(validatedInputs, membersInputs);
    setRegisterData(updated);
    this.setState({ isFormValid });
  };

  onAddNewMember = async () => {
    const { addNewUser } = this.props;
    await addNewUser();
    this.onModalClose();
  };

  onEditMemberModalOpen = (userId) => {
    const { members, setRegisterData } = this.props;
    const editedUser = members.find(({ id }) => id === userId);
    const { birthDate, startDate } = editedUser;
    this.onModalOpen();
    setRegisterData({ ...editedUser, birthDate: dateToString(birthDate), startDate: dateToString(startDate) });
    return this.setState({
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditUser = async () => {
    const { editUserData } = this.props;
    await editUserData();
    this.onModalClose();
  };

  onMemberDataOpen = (userId) => {
    const { members, setRegisterData } = this.props;
    const editedUser = members.find(({ id }) => id === userId);
    setRegisterData(editedUser);
    this.setState({
      showModal: true,
      isDetailMode: true,
    });
  };

  onUserDelete = async (userId) => {
    const { deleteUserData } = this.props;
    const response = await deleteUserData(userId);
    return response;
  };

  onSubmit = () => {
    const { isEditMode } = this.state;
    return isEditMode ? this.onSubmitEditUser() : this.onAddNewMember();
  };

  render() {
    const { isLoaded, showModal, isEditMode, isDetailMode, isFormValid } = this.state;
    const {
      user: { role },
    } = this.context;
    const { members, formData } = this.props;
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

MembersPage.contextType = AuthContext;

const mapStateToProps = ({ members, formData }) => ({ members, formData });

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersData: () => dispatch(getUsers()),
    addNewUser: () => dispatch(addUser()),
    editUserData: () => dispatch(editUser()),
    deleteUserData: (id) => dispatch(deleteUser(id)),
    setRegisterData: (data) => dispatch(setFormData(data)),
  };
};

MembersPage.propTypes = {
  formData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setRegisterData: PropTypes.func.isRequired,
  getUsersData: PropTypes.func.isRequired,
  addNewUser: PropTypes.func.isRequired,
  editUserData: PropTypes.func.isRequired,
  deleteUserData: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
