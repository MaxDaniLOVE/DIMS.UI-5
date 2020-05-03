import React from 'react';
import { getCurrentYear } from '../../utils/convertDate';
import './footer.scss';

const Footer = () => (
  <footer className='footer'>
    <h6 className='footer__title'>{getCurrentYear()}</h6>
  </footer>
);

export default Footer;
