import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import Layout from '../components/Layout';
import { getUserProgress } from '../store/actions';

const db = new Firebase();

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      memberName: '',
    };
  }

  componentDidMount() {
    const { match, getUserSubtasks } = this.props;
    const {
      params: { mid },
    } = match;
    getUserSubtasks(mid);
    db.getUserData(mid).then(({ name }) => {
      this.setState({
        memberName: name,
        isLoaded: true,
      });
    });
  }

  render() {
    const { isLoaded, memberName } = this.state;
    const { progress } = this.props;
    return (
      <Layout>
        {isLoaded ? (
          <>
            <h2>{`${memberName}'s progress:`}</h2>
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
  getUserSubtasks: PropTypes.func.isRequired,
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ progress }) => ({ progress });

const mapDispatchToProps = (dispatch) => {
  return {
    getUserSubtasks: (id) => dispatch(getUserProgress(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MembersProgressPage));
