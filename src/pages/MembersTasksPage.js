import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersTasksTable from '../components/MembersTasksTable';
import Preloader from '../components/Preloader';
import Layout from '../components/Layout';
import AuthContext from '../context';
import { getUserTasks } from '../store/actions';

const db = new Firebase();

class MembersTasksPage extends Component {
  constructor() {
    super();
    this.state = {
      userTasks: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getUserTasksData();
  }

  static getDerivedStateFromProps(nextProps) {
    const { userTasks } = nextProps;
    return {
      userTasks,
    };
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

  onSetMark = async (userTaskId, state) => {
    const result = await db.onSetUserMark(userTaskId, state);
    await this.getUserTasksData();
    return result;
  };

  render() {
    const { userTasks, isLoaded } = this.state;
    const {
      user: { role },
    } = this.context;
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
  userTasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
};

const mapStateToProps = ({ userTasks }) => {
  return {
    userTasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserTasks: (id) => {
      dispatch(getUserTasks(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersTasksPage));
