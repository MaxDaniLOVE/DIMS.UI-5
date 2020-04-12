import React, { Component } from 'react';
import Preloader from '../components/Preloader';
import MembersTable from '../components/MembersTable';
import Firebase from '../services/Firebase';

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
    return <>{isLoaded ? <MembersTable members={members} /> : <Preloader />}</>;
  }
}
