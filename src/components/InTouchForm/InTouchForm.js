/* eslint-disable no-shadow */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { inTouchInputs } from '../../utils/inputs';
import { fieldValidation } from '../../utils/validation';
import { defaultInTouchData } from '../../utils/defaultInputsData';
import { SubmitButton, SuccessButton, GoBackButton } from '../../UI/Buttons';
import { sendMail } from '../../store/actions/dataActions';
import { Subtitle } from '../../UI/Titles';
import Preloader from '../Preloader';
import { MailIcon } from '../../assets/icons';
import InputGroup from '../InputGroup';
import './inTouchForm.scss';
import { useModalToggling } from '../../hooks';
import { ModalFooter, ModalBody } from '../../UI/ModalContent';

const InTouchForm = ({ sendMail, isDarkMode }) => {
  const { openModal, closeModal, onChange, isShowModal, formData, isFormValid } = useModalToggling(
    defaultInTouchData,
    inTouchInputs,
  );

  const [isSending, setIsSending] = useState(false);

  const startSending = () => {
    setIsSending(true);
  };
  const stopSending = () => {
    setIsSending(false);
  };

  const sendMessageToAuthor = useMemo(() => {
    return async () => {
      startSending();
      try {
        await sendMail(formData);
      } catch (error) {
        stopSending();
      }
      stopSending();
      closeModal();
    };
  }, [closeModal, formData, sendMail]);

  const inputs = inTouchInputs.map(({ label, id, type, validationPattern }) => {
    const pattern = fieldValidation(validationPattern);
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
              <ModalBody>{inputs}</ModalBody>
              <ModalFooter>
                <SubmitButton isFormValid={isFormValid} onClick={sendMessageToAuthor}>
                  <MailIcon />
                </SubmitButton>
                <GoBackButton onClick={closeModal} />
              </ModalFooter>
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
