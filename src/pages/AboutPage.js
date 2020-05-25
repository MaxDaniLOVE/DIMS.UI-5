import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavLink } from 'reactstrap';
import { MainTitle } from '../UI/Titles';

import tabs from '../utils/aboutPageTabs';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('dimsTab');

  const switchTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const links = tabs.map(({ tabId, tabLabel }) => {
    const onClick = () => switchTab(tabId);
    return (
      <NavLink active={activeTab === tabId} key={tabId} onClick={onClick}>
        {tabLabel}
      </NavLink>
    );
  });

  const tabPanes = tabs.map(({ tabId, content }) => (
    <TabPane key={tabId} tabId={tabId}>
      {content}
    </TabPane>
  ));

  return (
    <div className='about-page'>
      <MainTitle>Welcome to DIMS!</MainTitle>
      <Nav tabs>{links}</Nav>
      <TabContent activeTab={activeTab}>{tabPanes}</TabContent>
    </div>
  );
};

export default AboutPage;
