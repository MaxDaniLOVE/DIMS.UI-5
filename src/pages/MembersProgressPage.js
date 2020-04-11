import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class MembersProgressPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.mid);
  }

  render() {
    const { match } = this.props;
    return <div>{`There will be progress for member with id: ${match.params.mid}`}</div>;
  }
}

export default withRouter(MembersProgressPage);
