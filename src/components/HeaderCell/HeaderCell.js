/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SortDownIcon, SortUpIcon } from '../../assets/icons';
import { sortData } from '../../store/actions';

const HeaderCell = ({ id, children, isSortable, sortData, sortInfo, isSorted, tableType }) => {
  const { type, id: sortedId } = sortInfo;

  const sortUp = () => sortData(tableType, id, 'UP');
  const sortDown = () => sortData(tableType, id, 'DOWN');

  const wrapperClassName = isSorted && sortedId === id ? `head-cell active-sort ${type}` : 'head-cell';
  return (
    <th id={id}>
      <div className={wrapperClassName}>
        {children}
        {isSortable && (
          <span className='sort-buttons'>
            <SortUpIcon onClick={sortUp} />
            <SortDownIcon onClick={sortDown} />
          </span>
        )}
      </div>
    </th>
  );
};

HeaderCell.defaultProps = {
  tableType: '',
};

HeaderCell.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isSortable: PropTypes.bool.isRequired,
  sortInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  sortData: PropTypes.func.isRequired,
  isSorted: PropTypes.bool.isRequired,
  tableType: PropTypes.string,
};

const mapStateToProps = ({ sort: { sortInfo, isSorted } }) => {
  return { sortInfo, isSorted };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sortData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCell);
