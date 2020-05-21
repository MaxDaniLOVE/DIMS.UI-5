/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';
import Layout from '../components/Layout';
import AuthContext from '../context';
import { getUserTasks, setMark } from '../store/actions';
import EmptyTableMessage from '../UI/EmptyTableMessage';
import initializeService from '../utils/initializeService';
import { Subtitle } from '../UI/Titles';

const db = initializeService();

class MembersTasksPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      memberName: '',
    };
  }

  componentDidMount() {
    this.getUserTasksData();
  }

  getUserTasksData = async () => {
    const { match, getUserTasks } = this.props;
    const {
      params: { mid },
    } = match;
    await getUserTasks(mid);
    const { name: memberName } = await db.getUserById(mid);
    this.setState({ memberName, isLoaded: true });
  };

  onSetMark = async (userTaskId, state, taskId) => {
    const { setMark, match } = this.props;
    const {
      params: { mid: userId },
    } = match;
    const result = await setMark(state, userTaskId, taskId, userId);
    return result;
  };

  render() {
    const { isLoaded, memberName } = this.state;
    const { userTasks } = this.props;
    const {
      user: { role },
    } = this.context;
    if (!userTasks.length) {
      return (
        <EmptyTableMessage>It looks like you have no tasks! Please contact your mentor or admin</EmptyTableMessage>
      );
    }
    const header = role === 'USER' ? 'Hi! This is your current tasks:' : `All ${memberName}'s tasks:`;
    return (
      <Layout>
        {isLoaded ? (
          <>
            <Subtitle>{header}</Subtitle>
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
  getUserTasks: PropTypes.func.isRequired,
  setMark: PropTypes.func.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
};

const mapStateToProps = ({ data: { userTasks } }) => ({ userTasks });

const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserTasks, setMark }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersTasksPage));
