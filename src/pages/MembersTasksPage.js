import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';

class MembersTasksPage extends Component {
  constructor() {
    super();
    this.state = {
      userTasks: [],
    };
  }

  componentDidMount() {
    const db = new Firebase();
    const { match } = this.props;
    db.getUsersTasks(match.params.mid).then((newTasksData) => {
      this.setState({
        userTasks: newTasksData,
      });
    });
    console.log('there will be fetching data');
  }

  render() {
    const { match } = this.props;
    return <div>{`There will be tasks of member with id: ${match.params.mid}`}</div>;
  }
}

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersTasksPage);
