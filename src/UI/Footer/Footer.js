import React from 'react';
import './footer.scss';

const Footer = () => (
  <footer className='footer'>
    <h6 className='footer__title'>{new Date().getFullYear()}</h6>
  </footer>
);

export default Footer;
