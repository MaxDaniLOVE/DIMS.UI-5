import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import Firebase from '../services/Firebase';
import Button from '../UI/Button';
import { addCache, loadCache } from '../utils/cache';
import Modal from '../UI/Modal';
import MembersPageModal from '../components/MembersPageModal';
import { inputsParser, defaultRegisterData } from '../utils/inputsParser';

export default class MembersPage extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      isLoaded: false,
      showModal: false,
      registerData: defaultRegisterData,
    };
  }

  componentDidMount() {
    const cachedData = loadCache('members');
    if (cachedData) {
      this.setState({
        members: cachedData,
        isLoaded: true,
      });
    } else {
      const db = new Firebase();
      db.getUsersData().then((data) => {
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
    }
  }

  onModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      registerData: defaultRegisterData,
    });
  };

  onFormChange = (e) => {
    const { value, id } = e.target;
    this.setState(({ registerData }) => ({
      registerData: inputsParser(value, id, registerData),
    }));
  };

  render() {
    const { members, isLoaded, showModal } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    return (
      <div className='table-wrapper'>
        <Modal showModal={showModal} onModalClose={this.onModalClose}>
          <MembersPageModal onFormChange={this.onFormChange} />
        </Modal>
        {isLoaded ? (
          <>
            <Button customClass='with-margin' customStyles={btnStyles} onClick={this.onModalOpen}>
              <p className='btn-inner'>Register</p>
            </Button>
            <MembersTable members={members} />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}
