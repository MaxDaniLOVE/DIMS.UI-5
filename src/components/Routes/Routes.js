import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  AboutPage,
  AuthPage,
  MembersPage,
  MembersProgressPage,
  MembersTasksPage,
  TasksManagePage,
  TasksTrackManagePage,
} from '../../pages';
import AuthContext from '../../context';

const Routes = () => {
  const { user } = useContext(AuthContext);
  const { userId, role } = user;
  if (!role) {
    return (
      <>
        <Route exact path='/'>
          <Redirect to='/auth' />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Redirect to='/' />
      </>
    );
  }
  if (role === 'USER') {
    return (
      <>
        <Route exact path='/'>
          <Redirect to={`/member/${userId}/tasks`} />
        </Route>
        <Route path='/member/subtasks/:tid?' component={TasksTrackManagePage} />
        <Route path='/member/:mid/tasks'>
          <MembersTasksPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Redirect to='/' />
      </>
    );
  }
  return (
    <>
      <Route exact path='/'>
        <Redirect to='/members' />
      </Route>
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
      <Redirect to='/' />
    </>
  );
};

export default Routes;
