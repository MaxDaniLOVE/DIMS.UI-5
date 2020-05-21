import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AboutPage,
  AuthPage,
  MembersPage,
  MembersProgressPage,
  MembersTasksPage,
  TasksManagePage,
  TasksTrackManagePage,
} from '../../pages';

const Routes = ({ user }) => {
  const { userId, role } = user;
  if (!role) {
    return (
      <>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Redirect to='/auth' />
      </>
    );
  }
  if (role === 'USER') {
    return (
      <>
        <Route path='/member/subtasks/:tid?' component={TasksTrackManagePage} />
        <Route path='/member/:mid/tasks'>
          <MembersTasksPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Redirect to={`/member/${userId}/tasks`} />
      </>
    );
  }
  return (
    <>
      <Route path='/members'>
        <MembersPage />
      </Route>
      <Route path='/member/:mid/progress'>
        <MembersProgressPage />
      </Route>
      <Route path='/member/:mid/tasks'>
        <MembersTasksPage />
      </Route>
      <Route path='/tasks/:tid?' component={TasksManagePage} />
      <Route path='/about'>
        <AboutPage />
      </Route>
      <Redirect to='/members' />
    </>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Routes);
