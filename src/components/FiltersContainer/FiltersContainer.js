/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, CustomInput, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterData } from '../../store/actions';
import { ShowFiltersButton } from '../../UI/Buttons';
import { useTooltipToggling as useDropdownToggling } from '../../hooks';
import { dateToString, millisecondsToAge } from '../../utils/convertDate';
import { statesIds } from '../../utils/constants';
import './filtersContainer.scss';

const FiltersContainer = ({ filterInfo, settedFilters, filterData, pageType, inputs, isDarkMode }) => {
  const [isOpen, setIsOpen] = useDropdownToggling();

  const onChange = ({ target: { id, checked, value } }) => {
    const updatedFilters = { ...settedFilters };

    const helpingSet = new Set();
    settedFilters[id.split('_')[0]].map((el) => helpingSet.add(el));

    const filter = parseInt(value, 10) || value === '0' ? parseInt(value, 10) : value;

    if (checked) {
      helpingSet.add(filter);
    } else {
      helpingSet.delete(filter);
    }

    updatedFilters[id.split('_')[0]] = [...helpingSet];

    filterData(pageType, updatedFilters);
  };

  const containerClassName = isDarkMode ? 'filters-container dark-filters' : 'filters-container';

  return (
    <div className={containerClassName}>
      <ShowFiltersButton onClick={setIsOpen} isOpen={isOpen} />
      <Collapse isOpen={isOpen}>
        <div className='filter-inputs'>
          {inputs.map(({ id, label }) => (
            <div className='filter-inputs__column' key={id}>
              <p className='filter-inputs__title'>{label}</p>
              {filterInfo[id].map((option) => {
                let title = option;
                if (id === 'stateId') {
                  title = statesIds[option];
                }
                if (id.includes('Date')) {
                  title = dateToString(option);
                  if (id === 'birthDate') {
                    title = millisecondsToAge(option);
                  }
                }
                return (
                  <Label className='checkbox-label' htmlFor={`${id}_${option}_filter`} key={option}>
                    <CustomInput
                      name={id}
                      type='checkbox'
                      id={`${id}_${option}_filter`}
                      onChange={onChange}
                      value={option}
                      checked={settedFilters[id].includes(option)}
                    />
                    {title}
                  </Label>
                );
              })}
            </div>
          ))}
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
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ sort: { filterInfo, settedFilters }, data: { isDarkMode } }) => {
  return { filterInfo, settedFilters, isDarkMode };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ filterData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
