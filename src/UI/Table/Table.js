import React from 'react';
import PropTypes from 'prop-types';
import { Table as ReactStrapTable } from 'reactstrap';

const Table = ({ children, className }) => <ReactStrapTable className={className}>{children}</ReactStrapTable>;

Table.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Table;
