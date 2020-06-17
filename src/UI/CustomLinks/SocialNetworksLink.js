import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

const SocialNetworksLink = ({ children, href }) => {
  return (
    <Link href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </Link>
  );
};

SocialNetworksLink.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
};

export default SocialNetworksLink;
