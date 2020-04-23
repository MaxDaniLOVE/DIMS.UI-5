import React, { Component } from 'react';
import { loadCache } from '../../utils/cache';
import './checkboxes.scss';

class Checkboxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    const cachedData = loadCache('members');
    this.setState({ members: cachedData });
  }

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
                  <input value={id} type='checkbox' id={id} onChange={() => {}} />
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
