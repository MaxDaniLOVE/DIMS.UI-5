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
        <div className='modal__footer'>
          <Button
            onClick={() => {
              onSubmit();
              onModalClose();
            }}
            customClass='btn-success'
          >
            <p className='btn-inner'>Save</p>
          </Button>
          <Button onClick={onModalClose} customStyles={{ width: '10rem' }}>
            <span className='btn-inner'>Back to grid</span>
          </Button>
        </div>
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
