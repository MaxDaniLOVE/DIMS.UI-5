/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RadioInput from '../../UI/RadioInput';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { filterData } from '../../store/actions';

const FilterInputs = ({ inputs, filterInfo, filterData, pageType }) => {
  const onChange = ({ target: { value, id } }) => {
    const updatedFilters = inputsChangeHandler(value, id, filterInfo);
    filterData(pageType, updatedFilters);
  };

  return inputs.map(({ id, label, type, options }) => {
    const minMaxNumberValue = type === 'number' ? { min: 18, max: 100 } : '';

    return type === 'radio' ? (
      <RadioInput
        key={id}
        label={label}
        id={id}
        type={type}
        options={options}
        onChange={onChange}
        data={filterInfo}
        isFilter
      />
    ) : (
      <Label key={id} htmlFor={id}>
        {label}
        <Input
          id={id}
          type={type}
          onChange={onChange}
          value={filterInfo[id]}
          min={minMaxNumberValue.min}
          max={minMaxNumberValue.max}
        />
      </Label>
    );
  });
};

FilterInputs.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
  ).isRequired,
  filterInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  pageType: PropTypes.string.isRequired,
  filterData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sort: { filterInfo } }) => {
  return { filterInfo };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ filterData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterInputs);
