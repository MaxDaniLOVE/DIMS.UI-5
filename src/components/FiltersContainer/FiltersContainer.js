import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { ShowFiltersButton, ResetFiltersButton } from '../../UI/Buttons';
import { useTooltipToggling as useDropdownToggling } from '../../hooks';
import FilterInputs from '../FilterInputs';
import './filtersContainer.scss';

const FiltersContainer = ({ pageType, inputs }) => {
  const [isOpen, setIsOpen] = useDropdownToggling();

  return (
    <div className='filters-container'>
      <ShowFiltersButton onClick={setIsOpen} isOpen={isOpen} />
      <Collapse isOpen={isOpen}>
        <div className='collapse-container'>
          <FilterInputs inputs={inputs} pageType={pageType} />
          <ResetFiltersButton pageType={pageType} />
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
};

export default FiltersContainer;
