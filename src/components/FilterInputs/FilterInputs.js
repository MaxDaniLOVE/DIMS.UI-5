/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RadioInput from '../../UI/RadioInput';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { filterData } from '../../store/actions';
import { statesIds } from '../../utils/constants';

import './filterInputs.scss';

const FilterInputs = ({ inputs, filterInfo, filterData, pageType }) => {
  const onChange = ({ target: { value, id } }) => {
    const updatedFilters = inputsChangeHandler(value, id, filterInfo);
    filterData(pageType, updatedFilters);
  };

  const availiableInputs = inputs.map(({ id, label, type, options }) => {
    const minMaxNumberValue = type === 'number' ? { min: 18, max: 100 } : '';
    if (type === 'radio') {
      return (
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
      );
    }
    if (type === 'select') {
      return (
        <Label for={id} key={id}>
          {label}
          <Input type={type} name='stateId' id={id} onChange={onChange} value={filterInfo[id]}>
            <option value=''>All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {statesIds[option]}
              </option>
            ))}
          </Input>
        </Label>
      );
    }
    return (
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

  return <div className={`collapse-inputs ${pageType}-filter`}>{availiableInputs}</div>;
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
