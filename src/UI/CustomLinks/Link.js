import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children, href, target, rel }) => {
  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  );
};

Link.defaultProps = {
  target: '',
  rel: '',
};

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
};

export default Link;
