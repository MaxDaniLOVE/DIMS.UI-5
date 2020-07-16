import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { AngleIcon } from '../../assets/icons';

const ShowFiltersButton = ({ onClick, isOpen }) => {
  const newClassName = isOpen ? 'filters-btn open-filter' : 'filters-btn';

  return (
    <Button onClick={onClick} newClassName={newClassName}>
      <span className='icon-wrapper'>
        <AngleIcon />
      </span>
    </Button>
  );
};

ShowFiltersButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ShowFiltersButton;
