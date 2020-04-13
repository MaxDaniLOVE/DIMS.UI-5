import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';

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
    const db = new Firebase();
    const { match } = this.props;
    db.getUsersTasks(match.params.mid).then((newTasksData) => {
      this.setState({
        userTasks: newTasksData,
        isLoaded: true,
      });
    });
    db.getUserData(match.params.mid).then(({ name }) => {
      this.setState({
        memberName: name,
      });
    });
  }

  render() {
    const { userTasks, isLoaded, memberName } = this.state;
    return (
      <div className='table-wrapper'>
        {isLoaded ? (
          <>
            <h2>{`Hi, dear ${memberName}! This is your current tasks:`}</h2>
            <MembersTasksTable userTasks={userTasks} />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersTasksPage);
