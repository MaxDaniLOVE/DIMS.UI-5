import React, { Component } from 'react';
import Preloader from '../components/Preloader';
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
    db.getTestData().then((data) => {
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
    return (
      <>
        {isLoaded ? (
          <ul>
            {members.map(({ name, id }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        ) : (
          <Preloader />
        )}
      </>
    );
  }
}
