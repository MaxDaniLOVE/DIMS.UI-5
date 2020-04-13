import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';

import './Modal.scss';

const ModalOverlay = ({ children, onModalClose, onSubmit }) => {
  const content = (
    <div className='modal-backdrop'>
      <form className='modal' onSubmit={() => console.log('submit')}>
        <div className='modal__content'>{children}</div>
        <Button onClick={onModalClose}>
          <p className='btn-inner'>Close</p>
        </Button>
        <Button
          onClick={() => {
            onSubmit();
            onModalClose();
          }}
        >
          <p className='btn-inner'>Submit</p>
        </Button>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal'));
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
