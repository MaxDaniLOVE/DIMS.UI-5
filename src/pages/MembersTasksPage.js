import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';
import Layout from '../components/Layout';
import AuthContext from '../context';

const db = new Firebase();

class MembersTasksPage extends Component {
  constructor() {
    super();
    this.state = {
      userTasks: [],
      isLoaded: false,
      memberName: '',
    };
  }

  componentDidMount() {
    this.getUserTasksData();
  }

  getUserTasksData = async () => {
    const { match } = this.props;
    const newTasksData = await db.getUsersTasks(match.params.mid);
    const { name } = await db.getUserData(match.params.mid);
    this.setState({
      userTasks: newTasksData,
      isLoaded: true,
      memberName: name,
    });
  };

  onSetMark = async (userTaskId, state) => {
    const result = await db.onSetUserMark(userTaskId, state);
    await this.getUserTasksData();
    return result;
  };

  render() {
    const { userTasks, isLoaded, memberName } = this.state;
    const {
      user: { role },
    } = this.context;
    return (
      <Layout>
        {isLoaded ? (
          <>
            <h2>{`Hi, dear ${memberName}! This is your current tasks:`}</h2>
            <MembersTasksTable userTasks={userTasks} role={role} onSetMark={this.onSetMark} />
          </>
        ) : (
          <Preloader />
        )}
      </Layout>
    );
  }
}

MembersTasksPage.contextType = AuthContext;

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersTasksPage);
