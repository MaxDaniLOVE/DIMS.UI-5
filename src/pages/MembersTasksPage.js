import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';
import Layout from '../components/Layout';
import AuthContext from '../context';
import { getUserTasks, setMark } from '../store/actions';
import EmptyTableMessage from '../UI/EmptyTableMessage';

class MembersTasksPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getUserTasksData();
  }

  getUserTasksData = async () => {
    const { match, getAllUserTasks } = this.props;
    const {
      params: { mid },
    } = match;
    await getAllUserTasks(mid);
    this.setState({
      isLoaded: true,
    });
  };

  onSetMark = async (userTaskId, state, taskId) => {
    const { onSetUserMark, match } = this.props;
    const {
      params: { mid: userId },
    } = match;
    const result = await onSetUserMark(state, userTaskId, taskId, userId);
    return result;
  };

  render() {
    const { isLoaded } = this.state;
    const { userTasks } = this.props;
    const {
      user: { role },
    } = this.context;
    if (!userTasks.length) {
      return (
        <EmptyTableMessage>It looks like you have no tasks! Please contact your mentor or admin</EmptyTableMessage>
      );
    }
    return (
      <Layout>
        {isLoaded ? (
          <>
            <h2>Hi! This is your current tasks:</h2>
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
  getAllUserTasks: PropTypes.func.isRequired,
  onSetUserMark: PropTypes.func.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
};

const mapStateToProps = ({ userTasks }) => ({ userTasks });

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserTasks: (id) => dispatch(getUserTasks(id)),
    onSetUserMark: (state, userTaskId, taskId, userId) => dispatch(setMark(state, userTaskId, taskId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersTasksPage));
