/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { inTouchInputs } from '../../utils/inputs';
import { fieldValidation, validation } from '../../utils/validation';
import { defaultInTouchData } from '../../utils/defaultInputsData';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { SubmitButton, SuccessButton, GoBackButton } from '../../UI/Buttons';
import { sendMail } from '../../store/actions/dataActions';
import { Subtitle } from '../../UI/Titles';
import Preloader from '../Preloader';
import { MailIcon } from '../../assets/icons';
import InputGroup from '../InputGroup';
import './inTouchForm.scss';

const InTouchForm = ({ sendMail, isDarkMode }) => {
  const [formData, setFormData] = useState(defaultInTouchData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
    setTimeout(() => {
      setFormData(defaultInTouchData);
    }, 150);
  };

  const startSending = () => {
    setIsSending(true);
  };
  const stopSending = () => {
    setIsSending(false);
  };

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
  };

  const inputs = inTouchInputs.map(({ label, id, type, validationPattern, errorMessage }) => {
    const pattern = fieldValidation(validationPattern, errorMessage);
    const value = formData[id];
    return (
      <InputGroup key={id} id={id} value={value} type={type} onChange={onChange} validate={pattern}>
        {label}
      </InputGroup>
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

              <div className='modal-window__footer'>
                <SubmitButton isFormValid={isFormValid} onClick={sendMessageToAuthor}>
                  <MailIcon />
                </SubmitButton>
                <GoBackButton onClick={closeModal} />
              </div>
            </>
          )}
        </AvForm>
      </Modal>
      <SuccessButton onClick={openModal}>Hire me!</SuccessButton>
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
