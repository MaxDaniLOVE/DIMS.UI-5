import React from 'react';
import PropTypes from 'prop-types';
import './imageWrapper.scss';

const ImageWrapper = ({ children }) => <div className='image-wrapper'>{children}</div>;

ImageWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ImageWrapper;
