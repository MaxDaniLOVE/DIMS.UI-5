import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import Firebase from '../services/Firebase';
import { Button } from '../UI/Buttons';
import { addCache, loadCache } from '../utils/cache';
import Modal from '../UI/Modal';
import FormModal from '../components/FormModal';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { defaultRegisterData } from '../utils/defaultInputsData';
import DataModal from '../components/DataModal';
import { membersInputs } from '../utils/inputs';
import validation from '../utils/validation';

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
    this.setState({
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
      delete validatedInputs.id; // delete id of objects as it's should not be validate
      const isFormValid = validation(validatedInputs, membersInputs);
      return {
        registerData: updatedRegisterData,
        isFormValid,
      };
    });
  };

  onAddNewMember = async (member) => {
    await this.db.addNewUser(member);
    const result = await this.getMembersData();
    this.onModalClose();
    return result;
  };

  onEditMemberModalOpen = (userId) => {
    const { members } = this.state;
    const editedUser = members.find(({ id }) => id === userId);
    this.onModalOpen();
    this.setState({
      registerData: { ...editedUser },
      isEditMode: true,
      isFormValid: true,
    });
  };

  onSubmitEditUser = async () => {
    const { registerData } = this.state;
    await this.db.editUserData(registerData);
    const result = await this.getMembersData();
    this.onModalClose();
    return result;
  };

  onMemberDataOpen = (userId) => {
    const { members } = this.state;
    const editedUser = members.find(({ id }) => id === userId);
    this.onModalOpen();
    this.setState({
      registerData: { ...editedUser },
      isDetailMode: true,
    });
  };

  onUserDelete = async (userId) => {
    await this.db.deleteUser(userId);
    const result = await this.getMembersData();
    return result;
  };

  render() {
    const { members, isLoaded, showModal, registerData, isEditMode, isDetailMode, isFormValid } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    const modalHeader =
      isEditMode || isDetailMode ? <h3>{`${registerData.name}'s details:`}</h3> : <h3>Add new user:</h3>;
    return (
      <div className='table-wrapper'>
        <Modal
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
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}
