/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterData } from '../../store/actions';
import { ShowFiltersButton, ResetFiltersButton } from '../../UI/Buttons';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { useTooltipToggling as useDropdownToggling } from '../../hooks';
import RadioInput from '../../UI/RadioInput';
import './filtersContainer.scss';

const FiltersContainer = ({ filterInfo, filterData, pageType, inputs }) => {
  const [isOpen, setIsOpen] = useDropdownToggling();

  const onChange = ({ target: { value, id } }) => {
    const updatedFilters = inputsChangeHandler(value, id, filterInfo);
    filterData(pageType, updatedFilters);
  };

  return (
    <div className='filters-container'>
      <ShowFiltersButton onClick={setIsOpen} isOpen={isOpen} />
      <Collapse isOpen={isOpen}>
        <div className='collapse-container'>
          <div className='collapse-inputs'>
            {inputs.map(({ id, label, type, options }) => {
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
            })}
          </div>
          <ResetFiltersButton pageType={pageType} />
        </div>
      </Collapse>
    </div>
  );
};

FiltersContainer.propTypes = {
  filterInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  filterData: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
  ).isRequired,
};

const mapStateToProps = ({ sort: { filterInfo } }) => {
  return { filterInfo };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ filterData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
