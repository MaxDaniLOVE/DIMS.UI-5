/* eslint-disable no-shadow */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import { ChangePassButton } from '../Buttons';
import { changePassInputs } from '../../utils/inputs';
import { fieldValidation, validation } from '../../utils/validation';
import { defaultPassChangeData } from '../../utils/defaultInputsData';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import InputGroup from '../../components/InputGroup';
import ChangePassForm from '../../components/ChangePassForm';
import { changePassword } from '../../store/actions';

const CurrentUser = ({ children, changePassword }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState(defaultPassChangeData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const openModal = () => setIsShowModal(true);
  const closeModal = () => {
    setIsShowModal(false);
    setFormData(defaultPassChangeData);
    setIsFormValid(false);
  };

  const onChange = ({ target: { value, id } }) => {
    const updated = inputsChangeHandler(value, id, formData);

    const isValid = validation(updated, changePassInputs);

    setFormData(updated);
    setIsFormValid(isValid);
  };

  const onSubmit = async () => {
    const { password } = formData;
    await changePassword(password);
    closeModal();
  };
  const inputs = changePassInputs.map(({ label, id, type, validationPattern }) => {
    const pattern = fieldValidation(validationPattern);
    const value = formData[id];
    const newType = isShowPass ? 'text' : type;
    return (
      <InputGroup key={id} id={id} value={value} type={newType} onChange={onChange} validate={pattern}>
        {label}
      </InputGroup>
    );
  });

  const showPassHandler = useCallback(() => setIsShowPass(!isShowPass), [isShowPass]);

  return (
    <>
      <ChangePassButton onClick={openModal}>{children}</ChangePassButton>
      <Modal isOpen={isShowModal} toggle={closeModal}>
        <ChangePassForm
          isShowPass={isShowPass}
          isFormValid={isFormValid}
          onSubmit={onSubmit}
          showPassHandler={showPassHandler}
        >
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
