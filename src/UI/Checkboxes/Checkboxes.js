import React, { Component } from 'react';
import { loadCache } from '../../utils/cache';
import './checkboxes.scss';

class Checkboxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      assgnedMembers: [],
    };
  }

  componentDidMount() {
    const cachedData = loadCache('members');
    this.setState({ members: cachedData });
  }

  onCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const { assgnedMembers } = this.state;
    const { onCheckboxChange } = this.props;
    const updatedMembers = new Set();
    assgnedMembers.map((el) => updatedMembers.add(el));
    if (checked) {
      updatedMembers.add(id);
    } else {
      updatedMembers.delete(id);
    }
    this.setState(() => ({
      assgnedMembers: [...updatedMembers],
    }));
    onCheckboxChange([...updatedMembers]);
  };

  render() {
    const { members } = this.state;
    return (
      <div className='members-checkboxes__wrapper'>
        Assign members:
        <div className='members-checkboxes'>
          {members.map(({ name, lastName, id }) => {
            return (
              <div className='form-inputs' key={id}>
                <label htmlFor={id}>
                  {`${name} ${lastName}:`}
                  <input value={id} type='checkbox' id={id} onChange={this.onCheckboxChange} />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Checkboxes;
