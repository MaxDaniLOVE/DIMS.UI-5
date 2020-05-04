import React from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { setActiveService } from '../../store/actions';
import './serviceToggle.scss';

const ServiceToggle = ({ setNewActiveService }) => {
  return (
    <FormGroup className='service-toggle'>
      <CustomInput
        type='switch'
        id='exampleCustomSwitch'
        name='customSwitch'
        label='Use Azure as service'
        value='azure'
        onChange={setNewActiveService}
      />
    </FormGroup>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewActiveService: (activePage) => {
      dispatch(setActiveService(activePage));
    },
  };
};

export default connect(null, mapDispatchToProps)(ServiceToggle);
