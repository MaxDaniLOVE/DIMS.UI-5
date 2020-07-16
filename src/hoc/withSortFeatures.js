/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { sortData, resetFilterData } from '../store/actions';
import FiltersContainer from '../components/FiltersContainer';
import {
  membersFilterInputs,
  tasksFilterInputs,
  progressFilterInputs,
  userTasksFilterInputs,
} from '../utils/filterInputs';

const withSortFeatures = (WrappedComponent, pageType) => (props) => {
  const { sortedData, data, isSorted, sortData, isFiltered, filteredData, resetFilterData, ...properties } = props;

  useEffect(() => {
    resetFilterData(pageType, data);
  }, [data, resetFilterData]);

  const inputs = {
    members: membersFilterInputs,
    tasks: tasksFilterInputs,
    progress: progressFilterInputs,
    userTasks: userTasksFilterInputs,
  };

  let displayedData = isSorted ? sortedData : data;

  displayedData = isFiltered ? filteredData : displayedData;

  return (
    <>
      <FiltersContainer inputs={inputs[pageType]} pageType={pageType} />
      <WrappedComponent data={displayedData} {...properties} />
    </>
  );
};

const mapStateToProps = ({ sort: { sortedData, sortInfo, isSorted, isFiltered, filteredData } }) => ({
  sortedData,
  sortInfo,
  isSorted,
  filteredData,
  isFiltered,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sortData, resetFilterData }, dispatch);
};

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withSortFeatures);

export default composedModalHOC;
