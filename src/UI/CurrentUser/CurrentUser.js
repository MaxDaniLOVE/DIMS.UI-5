/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import { ChangePassButton } from '../Buttons';
import { changePassInputs } from '../../utils/inputs';
import { passChangeValidation, validation } from '../../utils/validation';
import { defaultPassChangeData } from '../../utils/defaultInputsData';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import PassInput from '../../components/PassInput';
import ChangePassForm from '../../components/ChangePassForm';
import { changePassword } from '../../store/actions';
import { useDelay } from '../../hooks';

const CurrentUser = ({ children, changePassword }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState(defaultPassChangeData);
  const [isFormValid, setIsFormValid] = useState(false);

  const openModal = () => setIsShowModal(true);

  const closeModal = useDelay(setIsShowModal, setFormData, setIsFormValid, defaultPassChangeData);

  const onChange = ({ target: { value, id } }) => {
    const updated = inputsChangeHandler(value, id, formData);
    const { newPassword, confirmPassword } = updated;
    const isValid = validation(updated, changePassInputs) && newPassword === confirmPassword;

    setFormData(updated);
    setIsFormValid(isValid);
  };

  const onSubmit = async () => {
    const { newPassword } = formData;
    await changePassword(newPassword);
    closeModal();
  };
  const inputs = changePassInputs.map(({ label, id, validationPattern }) => {
    const pattern = passChangeValidation(validationPattern, id, formData.newPassword);

    const value = formData[id];
    return (
      <PassInput key={id} id={id} value={value} onChange={onChange} validate={pattern}>
        {label}
      </PassInput>
    );
  });

  return (
    <>
      <ChangePassButton onClick={openModal}>{children}</ChangePassButton>
      <Modal isOpen={isShowModal} toggle={closeModal}>
        <ChangePassForm isFormValid={isFormValid} onSubmit={onSubmit} closeModal={closeModal}>
          {inputs}
        </ChangePassForm>
      </Modal>
    </>
  );
};

CurrentUser.defaultProps = {
  children: '',
};

CurrentUser.propTypes = {
  children: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ changePassword }, dispatch);

export default connect(null, mapDispatchToProps)(CurrentUser);
