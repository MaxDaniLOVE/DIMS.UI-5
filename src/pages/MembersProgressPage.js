/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import Layout from '../components/Layout';
import { getUserProgress } from '../store/actions';
import initializeService from '../utils/initializeService';
import { Subtitle, DangerSubtitle } from '../UI/Titles';

const db = initializeService();

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      memberName: '',
    };
  }

  async componentDidMount() {
    const { match, getUserProgress } = this.props;
    const {
      params: { mid },
    } = match;
    getUserProgress(mid);
    const { name: memberName } = await db.getUserById(mid);
    this.setState({ memberName, isLoaded: true });
  }

  render() {
    const { isLoaded, memberName } = this.state;
    const { progress } = this.props;
    if (!progress.length && isLoaded) {
      return <DangerSubtitle>This user has no subtasks :(</DangerSubtitle>;
    }
    return (
      <Layout>
        {isLoaded ? (
          <>
            <Subtitle>{`${memberName}'s progress:`}</Subtitle>
            <MembersProgressTable progress={progress} />
          </>
        ) : (
          <Preloader />
        )}
      </Layout>
    );
  }
}

MembersProgressPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getUserProgress: PropTypes.func.isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ data: { progress } }) => {
  return { progress };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserProgress }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersProgressPage));
