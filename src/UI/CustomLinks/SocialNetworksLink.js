import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

const SocialNetworksLink = ({ children, href, target, rel }) => {
  return (
    <Link href={href} target={target} rel={rel}>
      {children}
    </Link>
  );
};

SocialNetworksLink.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

SocialNetworksLink.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
};

export default SocialNetworksLink;
