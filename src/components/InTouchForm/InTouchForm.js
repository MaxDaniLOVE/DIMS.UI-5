/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Label } from 'reactstrap';
import { AvGroup, AvField, AvForm } from 'availity-reactstrap-validation';
import { inTouchInputs } from '../../utils/inputs';
import { fieldValidation, validation } from '../../utils/validation';
import { defaultInTouchData } from '../../utils/defaultInputsData';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { SubmitButton } from '../../UI/Buttons';
import { sendMail } from '../../store/actions/dataActions';

const InTouchForm = ({ sendMail }) => {
  const [formData, setFormData] = useState(defaultInTouchData);
  const [isFormValid, setIsFormValid] = useState(false);

  const onChange = ({ target: { value, id } }) => {
    let isMounted = true;
    const updated = inputsChangeHandler(value, id, formData);

    const isValid = validation(updated, inTouchInputs);
    if (isMounted) {
      setFormData(updated);
      setIsFormValid(isValid);
    }

    return () => {
      isMounted = false;
    };
  };

  const sendMessageToAuthor = () => sendMail(formData);

  const inputs = inTouchInputs.map(({ label, id, type, validationPattern, errorMessage }) => {
    const pattern = fieldValidation(validationPattern, errorMessage);
    const value = formData[id];
    return (
      <AvGroup className='form-inputs' key={id}>
        <Label htmlFor={id}>
          {label}
          <AvField name={id} value={value} type={type} id={id} onChange={onChange} validate={pattern} />
        </Label>
      </AvGroup>
    );
  });
  return (
    <AvForm>
      {inputs}
      <SubmitButton isFormValid={isFormValid} onClick={sendMessageToAuthor}>
        SEND MAIL
      </SubmitButton>
    </AvForm>
  );
};
const mapStateToProps = ({ data: { isDarkMode } }) => ({ isDarkMode });

const mapDispatchToProps = (dispatch) => bindActionCreators({ sendMail }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InTouchForm);
