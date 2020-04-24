import React, { Component } from 'react';
import { loadCache } from '../../utils/cache';
import './checkboxes.scss';

class Checkboxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      assignedMembers: [],
    };
  }

  componentDidMount() {
    const cachedData = loadCache('members');
    const { assignedMembers } = this.props;
    this.setState({
      members: cachedData,
      assignedMembers,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { assignedMembers } = nextProps;
    this.setState({
      assignedMembers,
    });
  }

  onCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const { assignedMembers } = this.state;
    const { onCheckboxChange } = this.props;
    const updatedMembers = new Set();
    assignedMembers.map((el) => updatedMembers.add(el));
    if (checked) {
      updatedMembers.add(id);
    } else {
      updatedMembers.delete(id);
    }
    this.setState(() => ({
      assignedMembers: [...updatedMembers],
    }));
    onCheckboxChange([...updatedMembers]);
  };

  render() {
    const { members, assignedMembers } = this.state;
    return (
      <div className='members-checkboxes__wrapper'>
        Assign members:
        <div className='members-checkboxes'>
          {members.map(({ name, lastName, id }) => {
            return (
              <div className='form-inputs' key={id}>
                <label htmlFor={id}>
                  {`${name} ${lastName}:`}
                  <input
                    value={id}
                    type='checkbox'
                    id={id}
                    onChange={this.onCheckboxChange}
                    checked={assignedMembers.includes(id)}
                  />
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
