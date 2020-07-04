import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = ({ children }) => <div className='modal-window__content'>{children}</div>;

ModalBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default ModalBody;
