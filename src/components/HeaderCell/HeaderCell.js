import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortDownIcon, SortUpIcon } from '../../assets/icons';

const HeaderCell = ({ id, children, isSortable, sortFromAToZ, sortFromZToA, sortInfo, isSorted }) => {
  const { type, id: sortedId } = sortInfo;

  const sortUp = () => sortFromAToZ(id);
  const sortDown = () => sortFromZToA(id);

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

HeaderCell.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isSortable: PropTypes.bool.isRequired,
  sortInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  sortFromAToZ: PropTypes.func.isRequired,
  sortFromZToA: PropTypes.func.isRequired,
  isSorted: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ sort: { sortInfo, isSorted } }) => {
  return { sortInfo, isSorted };
};

export default connect(mapStateToProps, null)(HeaderCell);
