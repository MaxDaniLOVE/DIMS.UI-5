import React from 'react';
import PropTypes from 'prop-types';
import './TableHeader.scss';

const TableHeader = ({ headers }) => {
  return (
    <thead className='table-header'>
      <tr>
        {headers.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.defaultProps = {
  headers: [],
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
};

export default TableHeader;
