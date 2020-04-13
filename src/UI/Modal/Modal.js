import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import Button from '../Button';

const ModalOverlay = ({ children, onModalClose }) => {
  const content = (
    <div className='modal-backdrop'>
      <form className='modal' onSubmit={() => console.log('submit')}>
        <div className='modal__content'>{children}</div>
        <Button onClick={onModalClose}>
          <p className='btn-inner'>Close</p>
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

export default Modal;
