import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import Firebase from '../services/Firebase';
import Button from '../UI/Button';

export default class MembersPage extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    const db = new Firebase();
    db.getUsersData().then((data) => {
      const newMembers = [];
      data.forEach((doc) => {
        newMembers.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        members: newMembers,
        isLoaded: true,
      });
    });
  }

  render() {
    const { members, isLoaded } = this.state;
    const btnStyles = { marginBottom: '1rem' };
    return (
      <div className='table-wrapper'>
        {isLoaded ? (
          <>
            <Button customClass='with-margin' customStyles={btnStyles}>
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
