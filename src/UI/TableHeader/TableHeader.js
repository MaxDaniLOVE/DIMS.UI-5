import React from 'react';
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

export default TableHeader;
