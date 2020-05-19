import React from 'react';
import PropTypes from 'prop-types';
import './emptyTableMessage.scss';

const EmptyTableMessage = ({ children }) => <h2 className='empty-table-warning'>{children}</h2>;

EmptyTableMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default EmptyTableMessage;
