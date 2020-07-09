import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortDownIcon, SortUpIcon } from '../../assets/icons';
import './tableHeader.scss';

const TableHeader = ({ headers, isDarkMode, sortFromAToZ, sortFromZToA, sortInfo, isSorted }) => {
  const headerClassName = isDarkMode ? 'table-header dark-header' : 'table-header';
  const { type, id: sortedId } = sortInfo;
  return (
    <thead className={headerClassName}>
      <tr>
        {headers.map(({ id, value, isSortable }) => {
          const wrapperClassName = isSorted && sortedId === id ? `head-cell active-sort ${type}` : 'head-cell';
          return (
            <th key={id} id={id}>
              <div className={wrapperClassName}>
                {value}
                {isSortable && (
                  <span className='sort-buttons'>
                    <SortUpIcon onClick={() => sortFromAToZ(id)} />
                    <SortDownIcon onClick={() => sortFromZToA(id)} />
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.defaultProps = {
  sortFromAToZ: () => {},
  sortFromZToA: () => {},
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  sortFromAToZ: PropTypes.func,
  sortFromZToA: PropTypes.func,
  sortInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  isSorted: PropTypes.bool.isRequired,
};

const mapStateToPRops = ({ data: { isDarkMode }, sort: { sortInfo, isSorted } }) => {
  return { isDarkMode, sortInfo, isSorted };
};

export default connect(mapStateToPRops, null)(TableHeader);
