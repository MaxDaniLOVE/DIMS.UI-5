import React, { Component } from 'react';
import Firebase from './services/Firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      testData: '',
    };
  }

  componentDidMount() {
    const db = new Firebase();
    db.getTestData().then(({ test }) => {
      this.setState({
        testData: test,
      });
    });
  }

  render() {
    const { testData } = this.state;
    return <div className='App'>{testData}</div>;
  }
}

export default App;
