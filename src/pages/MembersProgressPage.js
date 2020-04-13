import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      progress: [],
    };
  }

  componentDidMount() {
    const db = new Firebase();
    const { match } = this.props;
    db.getUsersProgress(match.params.mid).then((progress) => {
      progress.sort((a, b) => (a.trackDate > b.trackDate ? 1 : -1)); // sort from old to new
      this.setState({
        progress,
      });
    });
  }

  render() {
    const { progress } = this.state;
    return <MembersProgressTable progress={progress} />;
  }
}

MembersProgressPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersProgressPage);
