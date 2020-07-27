/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { sortData } from '../store/actions';
import FiltersContainer from '../components/FiltersContainer';
import {
  membersFilterInputs,
  tasksFilterInputs,
  progressFilterInputs,
  userTasksFilterInputs,
} from '../utils/filterInputs';
import { NoFilteredDataTitle } from '../UI/Titles';

const withSortFeatures = (WrappedComponent, pageType) => (props) => {
  const inputs = {
    members: membersFilterInputs,
    tasks: tasksFilterInputs,
    progress: progressFilterInputs,
    userTasks: userTasksFilterInputs,
  };

  const {
    sortedData,
    data,
    isSorted,
    sortData,
    isFiltered,
    filteredData,
    sortedAndFilteredData,
    ...properties
  } = props;

  let displayedData = data;

  if (isSorted) {
    displayedData = sortedData;
  }
  if (isFiltered) {
    displayedData = filteredData;
  }
  if (isSorted && isFiltered) {
    displayedData = sortedAndFilteredData;
  }

  return (
    <>
      <FiltersContainer inputs={inputs[pageType]} pageType={pageType} />
      {isFiltered && !displayedData.length ? (
        <NoFilteredDataTitle />
      ) : (
        <WrappedComponent data={displayedData} {...properties} />
      )}
    </>
  );
};

const mapStateToProps = ({
  sort: { sortedData, sortInfo, isSorted, isFiltered, filteredData, sortedAndFilteredData },
}) => ({
  sortedData,
  sortInfo,
  isSorted,
  filteredData,
  isFiltered,
  sortedAndFilteredData,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sortData }, dispatch);
};

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withSortFeatures);

export default composedModalHOC;
