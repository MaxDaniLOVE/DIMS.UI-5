/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterData } from '../../store/actions';
import SuccessButton from './SuccessButton';

const ApplyFilterButton = ({ filterData, pageType }) => {
  const onClick = () => filterData(pageType);

  return <SuccessButton onClick={onClick}>Apply</SuccessButton>;
};

ApplyFilterButton.propTypes = {
  filterData: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ filterData }, dispatch);
};

export default connect(null, mapDispatchToProps)(ApplyFilterButton);
