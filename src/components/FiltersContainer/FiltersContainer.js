/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Input, CustomInput, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterData } from '../../store/actions';
import { ShowFiltersButton } from '../../UI/Buttons';
import inputsChangeHandler from '../../utils/inputsChangeHandler';
import { useTooltipToggling as useDropdownToggling } from '../../hooks';
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
        <div className='filter-inputs'>
          {inputs.map(({ id, label, type, options }) => {
            const minMaxNumberValue = type === 'number' ? { min: 18, max: 100 } : '';
            return type === 'radio' ? (
              options.map((option) => (
                <Label className='radio-label' htmlFor={`${id}_filter_${option}`} key={option}>
                  <CustomInput
                    name={id}
                    type={type}
                    id={`${id}_filter_${option}`}
                    onChange={onChange}
                    value={option}
                    checked={filterInfo[id] === option}
                  />
                  {option}
                </Label>
              ))
            ) : (
              <Label key={id} htmlFor={id}>
                {label}
                <Input
                  id={id}
                  type={type}
                  onChange={onChange}
                  min={minMaxNumberValue.min}
                  max={minMaxNumberValue.max}
                />
              </Label>
            );
          })}
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
