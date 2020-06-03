import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './tableHeader.scss';

const TableHeader = ({ headers, isDarkMode }) => {
  const headerClassName = isDarkMode ? 'table-header dark-header' : 'table-header';
  return (
    <thead className={headerClassName}>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToPRops = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToPRops, null)(TableHeader);
