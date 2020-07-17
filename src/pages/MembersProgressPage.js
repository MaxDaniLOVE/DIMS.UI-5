/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { getUserProgress, resetSort, setFilterData } from '../store/actions';
import initializeService from '../utils/initializeService';
import { Subtitle, DangerSubtitle } from '../UI/Titles';
import PageWrapper from '../UI/PageWrapper';

const db = initializeService();

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      memberName: '',
      userId: '',
    };
  }

  async componentDidMount() {
    const { match, getUserProgress, resetSort } = this.props;
    const {
      params: { mid },
    } = match;
    resetSort();
    await getUserProgress(mid);
    const { name: memberName } = await db.getUserById(mid);
    this.setState({ memberName, isLoaded: true, userId: mid });
  }

  componentDidUpdate() {
    const { setFilterData, progress } = this.props;
    setFilterData('progress', progress);
  }

  render() {
    const { isLoaded, memberName, userId } = this.state;
    const { progress } = this.props;
    if (!progress.length && isLoaded) {
      return <DangerSubtitle>This user has no subtasks :(</DangerSubtitle>;
    }
    return (
      <PageWrapper>
        {isLoaded ? (
          <>
            <Subtitle>{`${memberName}'s progress:`}</Subtitle>
            <MembersProgressTable data={progress} userId={userId} />
          </>
        ) : (
          <Preloader />
        )}
      </PageWrapper>
    );
  }
}

MembersProgressPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getUserProgress: PropTypes.func.isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  resetSort: PropTypes.func.isRequired,
  setFilterData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data: { progress } }) => {
  return { progress };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUserProgress, resetSort, setFilterData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersProgressPage));
