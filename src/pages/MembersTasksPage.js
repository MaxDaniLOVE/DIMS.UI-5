import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class MembersTasksPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.mid);
  }

  render() {
    const { match } = this.props;
    return <div>{`There will be tasks of member with id: ${match.params.mid}`}</div>;
  }
}

export default withRouter(MembersTasksPage);
