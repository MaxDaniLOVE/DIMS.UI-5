import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { ShowFiltersButton, ResetFiltersButton, ApplyFilterButton } from '../../UI/Buttons';
import { useTooltipToggling as useDropdownToggling } from '../../hooks';
import FilterInputs from '../FilterInputs';
import './filtersContainer.scss';

const FiltersContainer = ({ pageType, inputs, isDarkMode }) => {
  const [isOpen, setIsOpen] = useDropdownToggling();

  const defaultClassName = 'filters-container';
  const className = isDarkMode ? `${defaultClassName} dark-filters` : defaultClassName;

  return (
    <div className={className}>
      <ShowFiltersButton onClick={setIsOpen} isOpen={isOpen} />
      <Collapse isOpen={isOpen}>
        <div className='collapse-container'>
          <FilterInputs inputs={inputs} pageType={pageType} />
          <div className='filter-btns'>
            <ApplyFilterButton pageType={pageType} />
            <ResetFiltersButton pageType={pageType} />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

FiltersContainer.propTypes = {
  pageType: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default FiltersContainer;
