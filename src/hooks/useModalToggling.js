import { useCallback, useState } from 'react';
import inputsChangeHandler from '../utils/inputsChangeHandler';
import { validation } from '../utils/validation';

const useModalToggling = (defaultFormData, inputs) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [isFormValid, setIsFormValid] = useState(false);

  const openModal = () => setIsShowModal(true);

  const closeModal = useCallback(() => {
    setIsShowModal(false);
    setTimeout(() => {
      setFormData(defaultFormData);
      setIsFormValid(false);
    }, 150);
  }, [setFormData, setIsShowModal, defaultFormData, setIsFormValid]);

  const onChange = ({ target: { value, id } }) => {
    const updated = inputsChangeHandler(value, id, formData);
    const isValid = validation(updated, inputs);

    setFormData(updated);
    setIsFormValid(isValid);
  };

  return { openModal, closeModal, onChange, isShowModal, formData, isFormValid };
};

export default useModalToggling;
