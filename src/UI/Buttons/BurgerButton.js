import React from 'react';
import PropTypes from 'prop-types';

const BurgerButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='btn btn-danger navigation__menu-btn menu-btn' type='button'>
      <>
        <span />
        <span />
        <span />
      </>
    </button>
  );
};

BurgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerButton;
