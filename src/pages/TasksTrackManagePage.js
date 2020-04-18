import React, { Component } from 'react';
import Firebase from '../services/Firebase';
import MembersProgressTable from '../components/MembersProgressTable';
import Preloader from '../components/Preloader';
import { addCache, loadCache } from '../utils/cache';

class TasksTrackManagePage extends Component {
  constructor() {
    super();
    this.state = {
      progress: [],
      isLoaded: false,
    };
    this.db = new Firebase();
  }

  componentDidMount() {
    const memberId = '1XMvbioNVdqnsLoLEYnc'; // TODO get memberId from store/context
    const cachedProgress = loadCache(`${memberId}_progress`);
    if (cachedProgress) {
      this.setState({
        progress: cachedProgress,
        isLoaded: true,
      });
    } else {
      const db = new Firebase();
      db.getUsersProgress(memberId).then((progress) => {
        progress.sort((a, b) => (a.trackDate > b.trackDate ? 1 : -1)); // sort from old to new
        addCache(`${memberId}_progress`, progress);
        this.setState({
          progress,
          isLoaded: true,
        });
      });
    }
  }

  render() {
    const { progress, isLoaded } = this.state;
    return (
      <div className='table-wrapper'>
        {isLoaded ? (
          <>
            <h2>This is your tasks:</h2>
            <MembersProgressTable progress={progress} isMemberTasks />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

export default TasksTrackManagePage;
