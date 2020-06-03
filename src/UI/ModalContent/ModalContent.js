import React from 'react';
import PropTypes from 'prop-types';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { GoBackButton, SubmitButton } from '../Buttons';
import Checkboxes from '../Checkboxes';
import { ReactComponent as SaveIcon } from '../../assets/icons/save-solid.svg';

import './modal.scss';

const ModalContent = ({
  isDarkMode,
  children,
  onModalClose,
  onSubmit,
  isDetailMode,
  isFormValid,
  isCheckboxShow,
  isEditMode,
}) => {
  const formClassName = isDarkMode ? 'modal-window dark-modal' : 'modal-window';
  return (
    <AvForm className={formClassName} onSubmit={onSubmit}>
      <div className='modal-window__content'>
        {children}
        {isCheckboxShow ? <Checkboxes isEditMode={isEditMode} /> : null}
      </div>
      <div className='modal-window__footer'>
        {isDetailMode ? null : (
          <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
            <SaveIcon />
          </SubmitButton>
        )}
        <GoBackButton onClick={onModalClose} />
      </div>
    </AvForm>
  );
};

ModalContent.defaultProps = {
  isCheckboxShow: false,
};

ModalContent.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDetailMode: PropTypes.bool.isRequired,
  isCheckboxShow: PropTypes.bool,
  isEditMode: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToPRops = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToPRops, null)(ModalContent);
