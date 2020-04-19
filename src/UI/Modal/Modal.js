import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';

import './Modal.scss';

const modalDomElement = document.getElementById('modal');

const ModalOverlay = ({ children, onModalClose, onSubmit, isDetailMode }) => {
  const content = (
    <div className='modal-backdrop'>
      <form className='modal' onSubmit={() => console.log('submit')}>
        <div className='modal__content'>{children}</div>
        <div className='modal__footer'>
          {isDetailMode ? null : (
            <Button
              onClick={() => {
                onSubmit();
                onModalClose();
              }}
              customClass='btn-success'
            >
              <p className='btn-inner'>Save</p>
            </Button>
          )}
          <Button onClick={onModalClose} customStyles={{ width: '10rem' }}>
            <span className='btn-inner'>Back to grid</span>
          </Button>
        </div>
      </form>
    </div>
  );
  return createPortal(content, modalDomElement);
};

const Modal = (props) => {
  const { showModal } = props;
  if (showModal) {
    return <ModalOverlay {...props} />;
  }
  return null;
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
};

export default Modal;
