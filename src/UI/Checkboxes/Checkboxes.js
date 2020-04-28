import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { loadCache } from '../../utils/cache';
import './checkboxes.scss';

class Checkboxes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    const cachedData = loadCache('members');
    this.setState({
      members: cachedData,
    });
  }

  onCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const { onCheckboxChange, assignedMembers } = this.props;
    const updatedMembers = new Set();
    assignedMembers.map((el) => updatedMembers.add(el));
    if (checked) {
      updatedMembers.add(id);
    } else {
      updatedMembers.delete(id);
    }
    onCheckboxChange([...updatedMembers]);
  };

  render() {
    const { members } = this.state;
    const { assignedMembers } = this.props;
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

Checkboxes.propTypes = {
  assignedMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Checkboxes;
