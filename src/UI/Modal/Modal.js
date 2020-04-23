import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GoBackButton, SubmitButton } from '../Buttons';
import Checkboxes from '../Checkboxes';
import './modal.scss';

const modalDomElement = document.getElementById('modal');

const Modal = ({ children, onModalClose, onSubmit, isDetailMode, showModal, isFormValid }) => {
  const content = (
    <div className='modal-backdrop'>
      <form className='modal' onSubmit={onSubmit}>
        <div className='modal__content'>
          {children}
          <Checkboxes />
        </div>
        <div className='modal__footer'>
          {isDetailMode ? null : (
            <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
              Save
            </SubmitButton>
          )}
          <GoBackButton onClick={onModalClose} />
        </div>
      </form>
    </div>
  );
  return showModal ? createPortal(content, modalDomElement) : null;
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

export default Modal;
