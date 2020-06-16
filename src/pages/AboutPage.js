import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { MainTitle } from '../UI/Titles';

import tabs from '../utils/aboutPageTabs';

const AboutPage = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('dimsTab');

  const switchTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const linksClassNames = isDarkMode ? 'dark-link' : '';

  const links = tabs.map(({ tabId, tabLabel }) => {
    const onClick = () => switchTab(tabId);
    return (
      <NavLink className={linksClassNames} active={activeTab === tabId} key={tabId} onClick={onClick}>
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

AboutPage.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

export default connect(mapStateToProps, null)(AboutPage);
