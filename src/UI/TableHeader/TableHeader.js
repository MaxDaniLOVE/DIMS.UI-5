import React from 'react';
import PropTypes from 'prop-types';
import './tableHeader.scss';

const TableHeader = ({ headers }) => {
  return (
    <thead className='table-header'>
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
};

export default TableHeader;
