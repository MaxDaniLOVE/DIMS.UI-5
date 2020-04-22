import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GoBackButton, SuccessButton } from '../Buttons';

import './modal.scss';

const modalDomElement = document.getElementById('modal');

const Modal = ({ children, onModalClose, onSubmit, isDetailMode, showModal }) => {
  const content = (
    <div className='modal-backdrop'>
      <form className='modal' onSubmit={onSubmit}>
        <div className='modal__content'>{children}</div>
        <div className='modal__footer'>
          {isDetailMode ? null : <SuccessButton onClick={onSubmit}>Save</SuccessButton>}
          <GoBackButton onClick={onModalClose} />
        </div>
      </form>
    </div>
  );
  return showModal ? createPortal(content, modalDomElement) : null;
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
};

export default Modal;
