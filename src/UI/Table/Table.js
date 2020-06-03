import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table as ReactStrapTable } from 'reactstrap';
import './table.scss';

const Table = ({ children, className, isDarkMode }) => {
  const fullClassName = isDarkMode ? `${className} dark-table` : className;
  return <ReactStrapTable className={fullClassName}>{children}</ReactStrapTable>;
};

Table.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToProps, null)(Table);
