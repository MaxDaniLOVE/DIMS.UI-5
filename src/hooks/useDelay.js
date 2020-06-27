import { useCallback } from 'react';

const useDelay = (setIsShowModal, setFormData, setIsFormValid, defaultFormData) =>
  useCallback(() => {
    setIsShowModal(false);
    setTimeout(() => {
      setFormData(defaultFormData);
      setIsFormValid(false);
    }, 150);
  }, [setFormData, setIsShowModal, defaultFormData, setIsFormValid]);

export default useDelay;
