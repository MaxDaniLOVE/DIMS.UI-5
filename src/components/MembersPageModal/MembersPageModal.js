import React, { Component } from 'react';

class MembersPageModal extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <>
        <h3>Register new user:</h3>
        <p>
          <label>Name: </label>
          <input />
        </p>
        <p>
          <label>Last name: </label>
          <input />
        </p>
        <p>
          <label>Direction: </label>
          <input />
        </p>
        <p>
          <label>Birth date: </label>
          <input type='date' />
        </p>
        <p>
          <label>Education: </label>
          <input />
        </p>
        <p>
          <label>E-mail: </label>
          <input type='email' />
        </p>
        <p>
          <label>Math score: </label>
          <input type='number' />
        </p>
        <p>
          <label>University average score: </label>
          <input type='number' />
        </p>
        <p>
          <label>Start date: </label>
          <input type='date' />
        </p>
        <p>
          <label>Sex: </label>
          <input type='radio' />
        </p>
        <p>
          <label>Skype: </label>
          <input />
        </p>
        <p>
          <label>Address: </label>
          <input />
        </p>
        <p>
          <label>Mobile phone: </label>
          <input type='tel' />
        </p>
      </>
    );
  }
}

export default MembersPageModal;
