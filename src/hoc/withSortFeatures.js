/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { sortData } from '../store/actions';

const withSortFeatures = (WrappedComponent) => (props) => {
  const { sortedData, data, isSorted, sortData, ...properties } = props;

  const displayedData = isSorted ? sortedData : data;

  return <WrappedComponent data={displayedData} {...properties} />;
};

const mapStateToProps = ({ sort: { sortedData, sortInfo, isSorted } }) => ({
  sortedData,
  sortInfo,
  isSorted,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sortData }, dispatch);
};

const composedModalHOC = compose(connect(mapStateToProps, mapDispatchToProps), withSortFeatures);

export default composedModalHOC;
