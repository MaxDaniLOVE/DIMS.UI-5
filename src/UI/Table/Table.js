import React from 'react';
import PropTypes from 'prop-types';
import { Table as ReactStrapTable } from 'reactstrap';

const Table = ({ children }) => <ReactStrapTable className='members-table table'>{children}</ReactStrapTable>;

Table.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Table;
