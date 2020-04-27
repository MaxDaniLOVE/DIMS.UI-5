import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TasksTrackManagePage from '../../pages/TasksTrackManagePage';
import MembersTasksPage from '../../pages/MembersTasksPage';
import MembersPage from '../../pages/MembersPage';
import MembersProgressPage from '../../pages/MembersProgressPage';
import TasksManagePage from '../../pages/TasksManagePage';
import AuthContext from '../../context';

const Routes = ({ role }) => {
  const { user } = useContext(AuthContext);
  const { userId } = user;

  switch (role) {
    case 'USER':
      return (
        <>
          <Route path='/member/subtasks/:tid?' render={(props) => <TasksTrackManagePage {...props} />} />
          <Route path='/member/:mid/tasks'>
            <MembersTasksPage />
          </Route>
          <Redirect to={`/member/${userId}/tasks`} />
        </>
      );
    case 'ADMIN':
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
          <Route path='/tasks/:tid?' render={(props) => <TasksManagePage {...props} />} />
          <Redirect to='/members' />
        </>
      );
    case 'MENTOR':
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
          <Route path='/tasks/:tid?' render={(props) => <TasksManagePage {...props} />} />
          <Redirect to='/members' />
        </>
      );
    default:
      break;
  }
};

export default Routes;
