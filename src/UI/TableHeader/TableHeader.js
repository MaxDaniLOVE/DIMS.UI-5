import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './tableHeader.scss';

const TableHeader = ({ headers, isDarkMode, sortFromAToZ, sortFromZToA }) => {
  const headerClassName = isDarkMode ? 'table-header dark-header' : 'table-header';
  return (
    <thead className={headerClassName}>
      <tr>
        {headers.map(({ id, value, isSortable }) => (
          <th key={id} id={id}>
            {value}
            {isSortable && (
              <>
                <button type='button' onClick={() => sortFromZToA(id)}>
                  Z-A
                </button>
                <button type='button' onClick={() => sortFromAToZ(id)}>
                  A-Z
                </button>
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  sortFromAToZ: PropTypes.func.isRequired,
  sortFromZToA: PropTypes.func.isRequired,
};

const mapStateToPRops = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToPRops, null)(TableHeader);
