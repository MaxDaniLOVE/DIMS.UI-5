import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GoBackButton, SubmitButton } from '../Buttons';
import Checkboxes from '../Checkboxes';
import './modal.scss';

const modalDomElement = document.getElementById('modal');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.setAttribute('class', 'modal-backdrop');
  }

  componentDidMount() {
    const { showModal } = this.props;
    if (showModal) {
      modalDomElement.appendChild(this.el);
    }
  }

  componentDidUpdate(prevProps) {
    const { showModal } = this.props;
    if (prevProps.showModal === showModal) {
      return null;
    }
    if (showModal) {
      modalDomElement.appendChild(this.el);
    } else {
      modalDomElement.removeChild(this.el);
    }
    return null;
  }

  componentWillUnmount() {
    if (modalDomElement.contains(this.el)) {
      modalDomElement.removeChild(this.el);
    }
  }

  render() {
    const {
      children,
      onModalClose,
      onSubmit,
      isDetailMode,
      isFormValid,
      onCheckboxChange,
      isCheckboxShow,
      assignedMembers,
      isEditMode,
    } = this.props;
    const content = (
      <div className='modal-backdrop'>
        <form className='modal' onSubmit={onSubmit}>
          <div className='modal__content'>
            {children}
            {isCheckboxShow ? (
              <Checkboxes
                isEditMode={isEditMode}
                onCheckboxChange={onCheckboxChange}
                assignedMembers={assignedMembers}
              />
            ) : null}
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
    return createPortal(content, this.el);
  }
}

Modal.defaultProps = {
  assignedMembers: [],
  onCheckboxChange: () => {},
  isCheckboxShow: false,
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDetailMode: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func,
  isCheckboxShow: PropTypes.bool,
  assignedMembers: PropTypes.arrayOf(PropTypes.string),
  isEditMode: PropTypes.bool.isRequired,
};

export default Modal;
