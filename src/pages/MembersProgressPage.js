import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
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
    const {
      params: { mid },
    } = match;
    db.getUsersProgress(mid).then((progress) => {
      const sortedProgress = sortFromOldToNew(progress);
      this.setState({
        progress: sortedProgress,
        isLoaded: true,
      });
    });
    db.getUserData(mid).then(({ name }) => {
      this.setState({
        memberName: name,
      });
    });
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
