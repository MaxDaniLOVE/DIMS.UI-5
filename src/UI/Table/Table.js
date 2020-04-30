import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children }) => <table className='members-table table'>{children}</table>;

Table.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Table;
