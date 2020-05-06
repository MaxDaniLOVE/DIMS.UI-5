import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, addUser, editUser, deleteUser } from '../store/actions';
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
import { stringToDate, dateToString } from '../utils/convertDate';
import AuthContext from '../context';

class MembersPage extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      isLoaded: false,
      showModal: false,
      registerData: defaultRegisterData,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    };
  }

  componentDidMount() {
    this.getMembersData();
  }

  static getDerivedStateFromProps(nextProps) {
    const { members } = nextProps;
    addCache('members', members);
    return {
      members,
    };
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
    this.setState({
      showModal: false,
      registerData: defaultRegisterData,
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ registerData }) => {
      const updated = inputsChangeHandler(value, id, registerData);
      const validatedInputs = { ...updated };
      const isFormValid = validation(validatedInputs, membersInputs);
      return {
        registerData: updated,
        isFormValid,
      };
    });
  };

  onAddNewMember = async (member) => {
    const { birthDate, startDate } = member;
    const { addNewUser } = this.props;
    const newMember = { ...member, birthDate: stringToDate(birthDate), startDate: stringToDate(startDate) };
    await addNewUser(newMember);
    this.onModalClose();
  };

  onEditMemberModalOpen = (userId) => {
    const { members } = this.state;
    const editedUser = members.find(({ id }) => id === userId);
    const { birthDate, startDate } = editedUser;
    this.onModalOpen();
    return this.setState({
      registerData: { ...editedUser, birthDate: dateToString(birthDate), startDate: dateToString(startDate) },
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditUser = async (member) => {
    const { birthDate, startDate } = member;
    const { editUserData } = this.props;
    const newMember = { ...member, birthDate: stringToDate(birthDate), startDate: stringToDate(startDate) };
    await editUserData(newMember);
    this.onModalClose();
  };

  onMemberDataOpen = (userId) => {
    const { members } = this.state;
    const editedUser = members.find(({ id }) => id === userId);
    this.setState({
      showModal: true,
      registerData: { ...editedUser },
      isDetailMode: true,
    });
  };

  onUserDelete = async (userId) => {
    const { deleteUserData } = this.props;
    const response = await deleteUserData(userId);
    return response;
  };

  onSubmit = () => {
    const { isEditMode, registerData } = this.state;
    return isEditMode ? this.onSubmitEditUser(registerData) : this.onAddNewMember(registerData);
  };

  render() {
    const { members, isLoaded, showModal, registerData, isEditMode, isDetailMode, isFormValid } = this.state;
    const {
      user: { role },
    } = this.context;
    const modalHeader =
      isEditMode || isDetailMode ? <h3>{`${registerData.name}'s details:`}</h3> : <h3>Add new user:</h3>;
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
              <DataModal header={modalHeader} data={registerData} inputFields={membersInputs} />
            ) : (
              <FormModal
                inputs={membersInputs}
                data={registerData}
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

const mapStateToProps = ({ members }) => ({ members });

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersData: () => dispatch(getUsers()),
    addNewUser: (user) => dispatch(addUser(user)),
    editUserData: (user) => dispatch(editUser(user)),
    deleteUserData: (id) => dispatch(deleteUser(id)),
  };
};

MembersPage.propTypes = {
  getUsersData: PropTypes.func.isRequired,
  addNewUser: PropTypes.func.isRequired,
  editUserData: PropTypes.func.isRequired,
  deleteUserData: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
