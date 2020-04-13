import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      progress: {},
    };
  }

  componentDidMount() {
    const db = new Firebase();
    const { match } = this.props;
    db.getUsersProgress(match.params.mid).then((progress) => {
      this.setState({
        progress,
      });
    });
  }

  render() {
    const { match } = this.props;
    return <div>{`There will be progress for member with id: ${match.params.mid}`}</div>;
  }
}

MembersProgressPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersProgressPage);
