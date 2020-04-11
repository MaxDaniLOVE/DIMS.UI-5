import React from 'react';

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
