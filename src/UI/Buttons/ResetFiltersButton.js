/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { resetFilterData } from '../../store/actions';
import DangerButton from './DangerButton';

const ResetFiltersButton = ({ pageType, resetFilterData }) => {
  const onClick = () => resetFilterData(pageType);
  return <DangerButton onClick={onClick}>Reset</DangerButton>;
};

ResetFiltersButton.propTypes = {
  pageType: PropTypes.string.isRequired,
  resetFilterData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ resetFilterData }, dispatch);
};

export default connect(null, mapDispatchToProps)(ResetFiltersButton);
