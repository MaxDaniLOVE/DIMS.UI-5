/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, CustomInput, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterData } from '../../store/actions';
import { ShowFiltersButton } from '../../UI/Buttons';
import { useTooltipToggling as useDropdownToggling } from '../../hooks';
import './filtersContainer.scss';

const FiltersContainer = ({ filterInfo, settedFilters, filterData, pageType, inputs }) => {
  const [isOpen, setIsOpen] = useDropdownToggling();
  const onChange = ({ target: { id, checked, value } }) => {
    const aaa = { ...settedFilters };

    const updatedFilters = new Set();
    settedFilters[id.split('_')[0]].map((el) => updatedFilters.add(el));

    if (checked) {
      updatedFilters.add(value);
    } else {
      updatedFilters.delete(value);
    }
    aaa[id.split('_')[0]] = [...updatedFilters];

    filterData(pageType, aaa);
  };

  return (
    <div className='filters-container'>
      <ShowFiltersButton onClick={setIsOpen} isOpen={isOpen} />
      <Collapse isOpen={isOpen}>
        <div className='filter-inputs'>
          {inputs.map(({ id }) => {
            return filterInfo[id].map((option) => (
              <Label className='radio-label' htmlFor={`${id}_${option}`} key={option}>
                <CustomInput
                  name={id}
                  type='checkbox'
                  id={`${id}_${option}`}
                  onChange={onChange}
                  value={option}
                  checked={settedFilters[id].includes(option)}
                />
                {option}
              </Label>
            ));
          })}
        </div>
      </Collapse>
    </div>
  );
};

FiltersContainer.propTypes = {
  filterInfo: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
  filterData: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
  ).isRequired,
  settedFilters: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
};

const mapStateToProps = ({ sort: { filterInfo, settedFilters } }) => {
  return { filterInfo, settedFilters };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ filterData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
