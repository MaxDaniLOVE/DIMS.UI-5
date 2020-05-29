import React from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { Button, DangerButton } from '../../UI/Buttons';
import { DangerSubtitle } from '../../UI/Titles';
import './deletingModal.scss';

const DeletingModal = ({ isOpen, onCloseModal, onDeleteData, children, isDarkMode }) => {
  const modalClassName = isDarkMode
    ? 'modal-window delete-modal-window dark-modal'
    : 'modal-window delete-modal-window';
  return (
    <Modal isOpen={isOpen} toggle={onCloseModal}>
      <div className={modalClassName}>
        <DangerSubtitle>{children}</DangerSubtitle>
        <div className='modal-window__footer'>
          <Button onClick={onCloseModal}>Exit</Button>
          <DangerButton onClick={onDeleteData}>Delete</DangerButton>
        </div>
      </div>
    </Modal>
  );
};

DeletingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default DeletingModal;
