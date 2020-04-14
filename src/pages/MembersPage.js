import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import Firebase from '../services/Firebase';
import Button from '../UI/Button';
import { addCache, loadCache } from '../utils/cache';
import Modal from '../UI/Modal';
import MembersPageModal from '../components/MembersPageModal';
import { inputsParser, defaultRegisterData } from '../utils/inputsParser';
import MembersDataModal from '../components/MembersDataModal';

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
    this.db.getUsersData().then((data) => {
      const newMembers = [];
      data.forEach((doc) => {
        newMembers.push({ ...doc.data(), id: doc.id });
      });
      addCache('members', newMembers);
      this.setState({
        members: newMembers,
        isLoaded: true,
      });
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
    });
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ registerData }) => ({
      registerData: inputsParser(value, id, registerData),
    }));
  };

  onAddNewMember = async (member) => {
    await this.db.addNewUser(member);
    await this.getMembersData();
  };

  onEditMemberModalOpen = (userId) => {
    const { members } = this.state;
    const editedUser = members.find(({ id }) => id === userId);
    this.onModalOpen();
    this.setState({
      registerData: { ...editedUser },
      isEditMode: true,
    });
  };

  onSubmitEditUser = async () => {
    const { registerData } = this.state;
    await this.db.editUserData(registerData);
    await this.getMembersData();
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

  render() {
    const { members, isLoaded, showModal, registerData, isEditMode, isDetailMode } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    return (
      <div className='table-wrapper'>
        <Modal
          showModal={showModal}
          isEditMode={isEditMode}
          isDetailMode={isDetailMode}
          onModalClose={this.onModalClose}
          onSubmit={() => (isEditMode ? this.onSubmitEditUser(registerData) : this.onAddNewMember(registerData))}
        >
          {isDetailMode ? (
            <MembersDataModal registerData={registerData} />
          ) : (
            <MembersPageModal registerData={registerData} onFormChange={this.onFormChange} isEditMode={isEditMode} />
          )}
        </Modal>
        {isLoaded ? (
          <>
            <Button customClass='with-margin' customStyles={btnStyles} onClick={this.onModalOpen}>
              <p className='btn-inner'>Register</p>
            </Button>
            <MembersTable
              members={members}
              onEditMemberModalOpen={this.onEditMemberModalOpen}
              onMemberDataOpen={this.onMemberDataOpen}
            />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}
