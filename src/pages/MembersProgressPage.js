import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';

class MembersProgressPage extends Component {
  constructor() {
    super();
    this.state = {
      progress: [],
      isLoaded: false,
      memberName: '',
    };
  }

  componentDidMount() {
    const db = new Firebase();
    const { match } = this.props;
    db.getUsersProgress(match.params.mid).then((progress) => {
      progress.sort((a, b) => (a.trackDate > b.trackDate ? 1 : -1)); // sort from old to new
      this.setState({
        progress,
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
    const { progress, isLoaded, memberName } = this.state;
    return (
      <div className='table-wrapper'>
        {isLoaded ? (
          <>
            <h2>{`${memberName}'s progress:`}</h2>
            <MembersProgressTable progress={progress} />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

MembersProgressPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersProgressPage);
