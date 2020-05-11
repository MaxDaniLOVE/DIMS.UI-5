import React, { Component } from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import { addCache, loadCache } from '../../utils/cache';
import './serviceToggle.scss';

class ServiceToggle extends Component {
  state = {
    isChecked: false,
  };

  componentDidMount() {
    const service = loadCache('service');
    const isChecked = service === 'azure';
    this.setState({ isChecked });
  }

  changeService = (event) => {
    const {
      target: { value, checked: isChecked },
    } = event;
    const service = isChecked ? value : 'firebase';
    addCache('service', service);
    this.setState({ isChecked });
    window.location.reload(); // TODO delete after api will be fully integrated
  };

  render() {
    const { isChecked } = this.state;
    return (
      <FormGroup className='service-toggle'>
        <CustomInput
          type='switch'
          id='exampleCustomSwitch'
          name='customSwitch'
          label='Use Azure as service'
          value='azure'
          checked={isChecked}
          onChange={this.changeService}
        />
      </FormGroup>
    );
  }
}

export default ServiceToggle;
