import React, { Component } from 'react';
import inputs from '../../utils/inputs';

import './MembersPageModal.scss';

class MembersPageModal extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  render() {
    const { onFormChange } = this.props;
    const inputsLabels = inputs.map(({ label, id, type }) => (
      <div className='form-inputs' key={id}>
        <label htmlFor={id}>
          {label}
          <input type={type} id={id} onChange={(e) => onFormChange(e)} />
        </label>
      </div>
    ));
    return (
      <>
        <h3>Register new user:</h3>
        {inputsLabels}
      </>
    );
  }
}

export default MembersPageModal;
