import React from 'react';
import PropTypes from 'prop-types';

const ModalFooter = ({ children }) => <div className='modal-window__footer'>{children}</div>;

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default ModalFooter;
