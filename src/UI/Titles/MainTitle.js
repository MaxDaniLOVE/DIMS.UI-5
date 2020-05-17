import React from 'react';
import PropTypes from 'prop-types';

const MainTitle = ({ children }) => <h1 className='main-title'>{children}</h1>;

MainTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default MainTitle;
