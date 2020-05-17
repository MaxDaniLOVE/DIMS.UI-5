import React from 'react';
import {
  AboutDIMS,
  AboutRoles,
  AboutMemberFeatures,
  AboutAdminOrMentorFeatures,
  AboutAuthor,
} from '../components/AboutTabs';

export default [
  {
    tabId: 'dimsTab',
    content: <AboutDIMS />,
    tabLabel: 'What is DIMS?',
  },
  {
    tabId: 'rolesTab',
    content: <AboutRoles />,
    tabLabel: 'What can the roles do?',
  },
  {
    tabId: 'memberTab',
    content: <AboutMemberFeatures />,
    tabLabel: 'How Members can use DIMS?',
  },
  {
    tabId: 'adminMentorTab',
    content: <AboutAdminOrMentorFeatures />,
    tabLabel: 'How Admin and Mentor can use DIMS?',
  },
  {
    tabId: 'authortab',
    content: <AboutAuthor />,
    tabLabel: 'About author',
  },
];
