import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';
import { addCache, loadCache } from '../utils/cache';
import Layout from '../components/Layout';

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
    const { match } = this.props;
    const cachedTasks = loadCache(`${match.params.mid}_tasks`);
    const cachedName = loadCache(`${match.params.mid}_name`);
    if (cachedTasks && cachedName) {
      this.setState({
        userTasks: cachedTasks,
        memberName: cachedName,
        isLoaded: true,
      });
    } else {
      db.getUsersTasks(match.params.mid).then((newTasksData) => {
        addCache(`${match.params.mid}_tasks`, newTasksData);
        this.setState({
          userTasks: newTasksData,
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
    const { userTasks, isLoaded, memberName } = this.state;
    return (
      <Layout>
        {isLoaded ? (
          <>
            <h2>{`Hi, dear ${memberName}! This is your current tasks:`}</h2>
            <MembersTasksTable userTasks={userTasks} />
          </>
        ) : (
          <Preloader />
        )}
      </Layout>
    );
  }
}

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersTasksPage);
