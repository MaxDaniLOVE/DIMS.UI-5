import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersTasksTable from '../components/MembersTasksTable';

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
    const { userTasks } = this.state;
    return <MembersTasksTable userTasks={userTasks} />;
  }
}

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersTasksPage);
