/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'reactstrap';
import { ChangePassButton } from '../Buttons';
import { changePassInputs } from '../../utils/inputs';
import { passChangeValidation } from '../../utils/validation';
import { defaultPassChangeData } from '../../utils/defaultInputsData';
import PassInput from '../../components/PassInput';
import ChangePassForm from '../../components/ChangePassForm';
import { changePassword } from '../../store/actions';
import { useModalToggling } from '../../hooks';

const CurrentUser = ({ children, changePassword, isDarkMode, providerId }) => {
  const { openModal, closeModal, onChange, isShowModal, formData, isFormValid } = useModalToggling(
    defaultPassChangeData,
    changePassInputs,
  );

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

  const modalClassName = isDarkMode ? 'dark-modal' : '';

  const isPasswordAuth = providerId !== 'password';

  return (
    <>
      <ChangePassButton onClick={openModal} isPasswordAuth={isPasswordAuth}>
        {children}
      </ChangePassButton>
      <Modal isOpen={isShowModal} toggle={closeModal} className={modalClassName}>
        <ChangePassForm isFormValid={isFormValid} onSubmit={onSubmit} closeModal={closeModal}>
          {inputs}
        </ChangePassForm>
      </Modal>
    </>
  );
};

CurrentUser.defaultProps = {
  children: '',
  providerId: '',
};

CurrentUser.propTypes = {
  children: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  providerId: PropTypes.string,
};

const mapStateToProps = ({ auth: { providerId }, data: { isDarkMode } }) => {
  return { isDarkMode, providerId };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ changePassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
