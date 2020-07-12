import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderCell from '../../components/HeaderCell';
import './tableHeader.scss';

const TableHeader = ({ headers, isDarkMode, sortFromAToZ, sortFromZToA }) => {
  const headerClassName = isDarkMode ? 'table-header dark-header' : 'table-header';
  return (
    <thead className={headerClassName}>
      <tr>
        {headers.map(({ id, value, isSortable }) => {
          return (
            <HeaderCell
              key={id}
              id={id}
              isSortable={isSortable}
              sortFromAToZ={sortFromAToZ}
              sortFromZToA={sortFromZToA}
            >
              {value}
            </HeaderCell>
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
};

const mapStateToPRops = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToPRops, null)(TableHeader);
