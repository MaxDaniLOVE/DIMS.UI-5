import React from 'react';
import { getCurrentYear } from '../../utils/convertDate';
import DarkModeToggle from '../../components/DarkModeToggle';
import './footer.scss';

const Footer = () => (
  <footer className='footer'>
    <DarkModeToggle />
    <h6 className='footer__title'>{getCurrentYear()}</h6>
  </footer>
);

export default Footer;
