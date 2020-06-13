/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Label, Modal } from 'reactstrap';
import { AvGroup, AvField, AvForm } from 'availity-reactstrap-validation';
import { inTouchInputs } from '../../utils/inputs';
import { fieldValidation, validation } from '../../utils/validation';
import { defaultInTouchData } from '../../utils/defaultInputsData';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { SubmitButton, SuccessButton } from '../../UI/Buttons';
import { sendMail } from '../../store/actions/dataActions';
import { Subtitle } from '../../UI/Titles';
import Preloader from '../Preloader';

import './inTouchForm.scss';

const InTouchForm = ({ sendMail, isDarkMode }) => {
  const [formData, setFormData] = useState(defaultInTouchData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const openModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  const startSending = () => setIsSending(true);
  const stopSending = () => setIsSending(false);

  const onChange = ({ target: { value, id } }) => {
    const updated = inputsChangeHandler(value, id, formData);

    const isValid = validation(updated, inTouchInputs);

    setFormData(updated);
    setIsFormValid(isValid);
  };

  const sendMessageToAuthor = async () => {
    startSending();
    try {
      await sendMail(formData);
    } catch (error) {
      stopSending();
    }
    stopSending();
    closeModal();
    setTimeout(() => {
      setFormData(defaultInTouchData);
    }, 150);
  };

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

  const defaultClassName = 'modal-window intouch-form';
  const formClassName = isDarkMode ? `${defaultClassName} dark-modal` : defaultClassName;

  return (
    <>
      <Modal isOpen={isShowModal} toggle={closeModal} className='modal-content'>
        <AvForm className={formClassName}>
          {isSending ? (
            <Preloader />
          ) : (
            <>
              <Subtitle>Please, fill this form:</Subtitle>
              {inputs}
              <SubmitButton isFormValid={isFormValid} onClick={sendMessageToAuthor}>
                Hire!
              </SubmitButton>
            </>
          )}
        </AvForm>
      </Modal>
      <SuccessButton onClick={openModal}>Send me mail!</SuccessButton>
    </>
  );
};

InTouchForm.propTypes = {
  sendMail: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => ({ isDarkMode });

const mapDispatchToProps = (dispatch) => bindActionCreators({ sendMail }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InTouchForm);
