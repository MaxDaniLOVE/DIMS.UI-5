import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TasksTrackManagePage from '../../pages/TasksTrackManagePage';
import MembersTasksPage from '../../pages/MembersTasksPage';
import MembersPage from '../../pages/MembersPage';
import MembersProgressPage from '../../pages/MembersProgressPage';
import TasksManagePage from '../../pages/TasksManagePage';
import AuthContext from '../../context';
import AuthPage from '../../pages/AuthPage';

const Routes = () => {
  const { user } = useContext(AuthContext);
  const { userId, role } = user;
  if (!role) {
    return (
      <>
        <Route path='/auth'>
          <AuthPage />
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
      <Redirect to='/members' />
    </>
  );
};

export default Routes;
