import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { addCache, loadCache } from '../utils/cache';
import Layout from '../components/Layout';
import sortFromOldToNew from '../utils/sortFromOldToNew';

const db = new Firebase();

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      progress: [],
      isLoaded: false,
      memberName: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const cachedProgress = loadCache(`${match.params.mid}_progress`);
    const cachedName = loadCache(`${match.params.mid}_name`);
    if (cachedProgress && cachedName) {
      this.setState({
        progress: cachedProgress,
        memberName: cachedName,
        isLoaded: true,
      });
    } else {
      db.getUsersProgress(match.params.mid).then((progress) => {
        const sortedProgress = sortFromOldToNew(progress);
        addCache(`${match.params.mid}_progress`, sortedProgress);
        this.setState({
          progress: sortedProgress,
          isLoaded: true,
        });
      });
      db.getUserData(match.params.mid).then(({ name }) => {
        addCache(`${match.params.mid}_name`, name);
        this.setState({
          memberName: name,
        });
      });
    }
  }

  render() {
    const { progress, isLoaded, memberName } = this.state;
    return (
      <Layout>
        {isLoaded ? (
          <>
            <h2>{`${memberName}'s progress:`}</h2>
            <MembersProgressTable progress={progress} />
          </>
        ) : (
          <Preloader />
        )}
      </Layout>
    );
  }
}

MembersProgressPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersProgressPage);
