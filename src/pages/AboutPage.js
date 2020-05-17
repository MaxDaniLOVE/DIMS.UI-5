import React from 'react';
import { MainTitle } from '../UI/Titles';

import {
  AboutDIMS,
  AboutRoles,
  AboutMemberFeatures,
  AboutAdminOrMentorFeatures,
  AboutAuthor,
} from '../components/AboutTabs';

const AboutPage = () => {
  return (
    <div className='about-page'>
      <MainTitle>Welcome to DIMS!</MainTitle>
      <AboutDIMS />
      <AboutRoles />
      <AboutMemberFeatures />
      <AboutAdminOrMentorFeatures />
      <AboutAuthor />
    </div>
  );
};

export default AboutPage;
