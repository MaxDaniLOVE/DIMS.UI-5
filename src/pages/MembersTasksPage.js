/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';
import { getUserTasks, setMark, resetSort, resetFilterData } from '../store/actions';
import initializeService from '../utils/initializeService';
import { Subtitle, DangerSubtitle } from '../UI/Titles';
import PageWrapper from '../UI/PageWrapper';

const db = initializeService();

class MembersTasksPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      memberName: '',
      userId: '',
    };
  }

  componentDidMount() {
    const { resetSort, resetFilterData } = this.props;
    resetSort();
    resetFilterData('userTasks');
    this.getUserTasksData();
  }

  getUserTasksData = async () => {
    const { match, getUserTasks } = this.props;
    const {
      params: { mid },
    } = match;
    await getUserTasks(mid);
    const { name: memberName } = await db.getUserById(mid);
    this.setState({ memberName, isLoaded: true, userId: mid });
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
    const { isLoaded, memberName, userId } = this.state;
    const {
      userTasks,
      user: { role },
    } = this.props;
    if (!userTasks.length && isLoaded) {
      const title =
        role === 'USER'
          ? 'It looks like you have no tasks! Please contact your mentor or admin'
          : "Visit 'All tasks' page and assign task to this user";
      return <DangerSubtitle>{title}</DangerSubtitle>;
    }
    const header = role === 'USER' ? 'Hi! This is your current tasks:' : `All ${memberName}'s tasks:`;
    return (
      <PageWrapper>
        {isLoaded ? (
          <>
            <Subtitle>{header}</Subtitle>
            <MembersTasksTable data={userTasks} role={role} onSetMark={this.onSetMark} userId={userId} />
          </>
        ) : (
          <Preloader />
        )}
      </PageWrapper>
    );
  }
}

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getUserTasks: PropTypes.func.isRequired,
  setMark: PropTypes.func.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  resetSort: PropTypes.func.isRequired,
  resetFilterData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { userTasks }, auth: { user } }) => {
  return { userTasks, user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserTasks, setMark, resetSort, resetFilterData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersTasksPage));
