import React, { Component } from 'react';
import Firebase from './services/Firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const db = new Firebase();
    db.getTestData().then((data) => {
      const newUsers = [];
      data.forEach((doc) => {
        newUsers.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        users: newUsers,
      });
    });
  }

  render() {
    const { users } = this.state;
    return (
      <div className='App'>
        {users.map(({ name, id, lastName }) => (
          <p key={id}>{`${name}, ${lastName}`}</p>
        ))}
      </div>
    );
  }
}

export default App;
