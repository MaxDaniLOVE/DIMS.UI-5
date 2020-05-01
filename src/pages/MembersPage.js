import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import Firebase from '../services/Firebase';
import { Button } from '../UI/Buttons';
import { addCache, loadCache } from '../utils/cache';
import ModalContent from '../UI/ModalContent';
import FormModal from '../components/FormModal';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { defaultRegisterData } from '../utils/defaultInputsData';
import DataModal from '../components/DataModal';
import { membersInputs } from '../utils/inputs';
import validation from '../utils/validation';
import { stringToDate, dateToString } from '../utils/convertDate';
import AuthContext from '../context';
import { DangerAlert } from '../UI/Alerts';

export default class MembersPage extends Component {
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
      showAlert: false,
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    const cachedData = loadCache('members');
    if (cachedData) {
      this.setState({
        members: cachedData,
        isLoaded: true,
      });
    } else {
      this.getMembersData();
    }
  }

  getMembersData = async () => {
    const data = await this.db.getUsersData();
    const newMembers = [];
    data.forEach((doc) => {
      newMembers.push({ ...doc.data(), id: doc.id });
    });
    addCache('members', newMembers);
    this.setState({
      members: newMembers,
      isLoaded: true,
    });
  };

  onModalOpen = () => {
    const {
      user: { role },
    } = this.context;
    if (role === 'MENTOR') {
      return this.setState({
        showAlert: true,
      });
    }
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
      const updatedRegisterData = inputsChangeHandler(value, id, registerData);
      const validatedInputs = { ...updatedRegisterData };
      const isFormValid = validation(validatedInputs, membersInputs);
      return {
        registerData: updatedRegisterData,
        isFormValid,
      };
    });
  };

  onAddNewMember = async (member) => {
    const { birthDate, startDate } = member;
    const newMember = { ...member, birthDate: stringToDate(birthDate), startDate: stringToDate(startDate) };
    await this.db.addNewUser(newMember);
    const result = await this.getMembersData();
    this.onModalClose();
    return result;
  };

  onEditMemberModalOpen = (userId) => {
    const {
      user: { role },
    } = this.context;
    if (role === 'MENTOR') {
      return this.setState({
        showAlert: true,
      });
    }
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
    const newMember = { ...member, birthDate: stringToDate(birthDate), startDate: stringToDate(startDate) };
    await this.db.editUserData(newMember);
    const result = await this.getMembersData();
    this.onModalClose();
    return result;
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
    const {
      user: { role },
    } = this.context;
    if (role === 'MENTOR') {
      return this.setState({
        showAlert: true,
      });
    }
    await this.db.deleteUser(userId);
    const result = await this.getMembersData();
    return result;
  };

  onAlertClose = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const { members, isLoaded, showModal, registerData, isEditMode, isDetailMode, isFormValid, showAlert } = this.state;
    const btnStyles = { marginBottom: '1rem' };
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
            onSubmit={() => (isEditMode ? this.onSubmitEditUser(registerData) : this.onAddNewMember(registerData))}
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
            <Button customClass='with-margin' customStyles={btnStyles} onClick={this.onModalOpen}>
              Register
            </Button>
            <MembersTable
              members={members}
              onEditMemberModalOpen={this.onEditMemberModalOpen}
              onMemberDataOpen={this.onMemberDataOpen}
              onUserDelete={this.onUserDelete}
            />
            <DangerAlert isOpen={showAlert} toggle={this.onAlertClose}>
              This feature available only for admin
            </DangerAlert>
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

MembersPage.contextType = AuthContext;
