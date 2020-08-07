/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RadioInput from '../../UI/RadioInput';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { setFilterInfo } from '../../store/actions';
import { statesIds } from '../../utils/constants';
import CheckboxInput from '../../UI/CheckboxInput';
import AgeInputs from '../AgeInputs';
import checkboxHandler from '../../utils/checkboxHandler';
import DateInput from '../../UI/DateInput';

import './filterInputs.scss';

const FilterInputs = ({ inputs, filterInfo, pageType, setFilterInfo }) => {
  const onChange = ({ target: { value, id, checked } }) => {
    let updatedFilters = inputsChangeHandler(value, id, filterInfo);
    if (id.includes('filter')) {
      const checkboxId = id.slice(0, id.indexOf('_'));
      const updatedCheckboxes = checkboxHandler([...filterInfo[checkboxId]], value, checked);
      updatedFilters = { ...updatedFilters, [checkboxId]: updatedCheckboxes };
    }
    setFilterInfo(updatedFilters);
  };

  const resetDateInput = (id) => {
    const updatedFilters = { ...filterInfo, [id]: '' };
    setFilterInfo(updatedFilters);
  };

  const availiableInputs = inputs.map(({ id, label, type, options }) => {
    if (id === 'age') {
      const { minAge, maxAge } = filterInfo;
      return <AgeInputs key={id} options={options} onChange={onChange} minAge={minAge} maxAge={maxAge} />;
    }
    if (type === 'checkbox') {
      return (
        <CheckboxInput
          key={id}
          id={id}
          label={label}
          options={options}
          onChange={onChange}
          dataToCompare={filterInfo[id]}
        />
      );
    }
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
    if (type === 'date') {
      return (
        <DateInput resetDateInput={resetDateInput} key={id} id={id} value={filterInfo[id]} onChange={onChange}>
          {label}
        </DateInput>
      );
    }
    return (
      <Label key={id} htmlFor={id}>
        {label}
        <Input id={id} type={type} onChange={onChange} value={filterInfo[id]} />
      </Label>
    );
  });

  return <div className={`collapse-inputs ${pageType}-filter`}>{availiableInputs}</div>;
};

FilterInputs.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
  ).isRequired,
  filterInfo: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]),
  ).isRequired,
  pageType: PropTypes.string.isRequired,
  setFilterInfo: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sort: { filterInfo } }) => {
  return { filterInfo };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFilterInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterInputs);
