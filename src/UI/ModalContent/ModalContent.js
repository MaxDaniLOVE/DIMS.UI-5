import React from 'react';
import PropTypes from 'prop-types';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { GoBackButton, SubmitButton } from '../Buttons';
import Checkboxes from '../Checkboxes';
import { SaveIcon } from '../../assets/icons';
import ModalFooter from './ModalFooter';
import ModalBody from './ModalBody';
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
      <ModalBody>
        {children}
        {isCheckboxShow ? <Checkboxes isEditMode={isEditMode} /> : null}
      </ModalBody>
      <ModalFooter>
        {isDetailMode ? null : (
          <SubmitButton isFormValid={isFormValid} onClick={onSubmit}>
            <SaveIcon />
          </SubmitButton>
        )}
        <GoBackButton onClick={onModalClose} />
      </ModalFooter>
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
