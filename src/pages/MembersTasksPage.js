import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class MembersTasksPage extends Component {
  componentDidMount() {
    console.log('there will be fetching data');
  }

  render() {
    const { match } = this.props;
    return <div>{`There will be tasks of member with id: ${match.params.mid}`}</div>;
  }
}

MembersTasksPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(MembersTasksPage);
