import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortDownIcon, SortUpIcon } from '../../assets/icons';
import './tableHeader.scss';

const TableHeader = ({ headers, isDarkMode, sortFromAToZ, sortFromZToA }) => {
  const headerClassName = isDarkMode ? 'table-header dark-header' : 'table-header';
  return (
    <thead className={headerClassName}>
      <tr>
        {headers.map(({ id, value, isSortable }) => (
          <th key={id} id={id}>
            <div>
              {value}
              {isSortable && (
                <span className='sort-buttons'>
                  <SortUpIcon onClick={() => sortFromZToA(id)} />
                  <SortDownIcon onClick={() => sortFromAToZ(id)} />
                </span>
              )}
            </div>
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
