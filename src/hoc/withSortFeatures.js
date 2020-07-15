/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { sortData } from '../store/actions';
import FiltersContainer from '../components/FiltersContainer';

const withSortFeatures = (WrappedComponent) => (props) => {
  const { sortedData, data, isSorted, sortData, isFiltered, filteredData, ...properties } = props;

  let displayedData = isSorted ? sortedData : data;

  displayedData = isFiltered ? filteredData : displayedData;

  return (
    <>
      <FiltersContainer />
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
  return bindActionCreators({ sortData }, dispatch);
};

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withSortFeatures);

export default composedModalHOC;
