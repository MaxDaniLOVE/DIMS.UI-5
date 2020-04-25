import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { GoBackButton, SuccessButton } from '../Buttons';

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

  render() {
    const { children, onModalClose, onSubmit, isDetailMode } = this.props;
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
    return createPortal(content, this.el);
  }
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
};

export default Modal;
