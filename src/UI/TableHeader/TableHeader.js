import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderCell from '../../components/HeaderCell';
import './tableHeader.scss';

const TableHeader = ({ headers, isDarkMode, tableType }) => {
  const headerClassName = isDarkMode ? 'table-header dark-header' : 'table-header';
  return (
    <thead className={headerClassName}>
      <tr>
        {headers.map(({ id, value, isSortable }) => {
          return (
            <HeaderCell key={id} id={id} isSortable={isSortable} tableType={tableType}>
              {value}
            </HeaderCell>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.defaultProps = {
  tableType: '',
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  tableType: PropTypes.string,
};

const mapStateToPRops = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToPRops, null)(TableHeader);
