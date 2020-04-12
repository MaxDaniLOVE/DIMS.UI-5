import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Button from '../../UI/Button';
import Status from '../../UI/Status';

const MembersTasksTable = ({ userTasks }) => {
  const headers = ['#', 'Name', 'Start', 'Deadline', 'Status', 'Manage', 'Mark'];
  const membersTasksTableBody = userTasks.map((task, idx) => {
    const { tasksInfo, stateId, userTaskId } = task;
    const { deadlineDate, name, startDate } = tasksInfo;
    return (
      <tr key={userTaskId}>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>{new Date(startDate).toLocaleDateString()}</td>
        <td>{new Date(deadlineDate).toLocaleDateString()}</td>
        <td>
          <Status stateId={stateId} />
        </td>
        <td>
          <Button>
            <p className='btn-inner'>Track</p>
          </Button>
        </td>
        <td>test</td>
      </tr>
    );
  });
  return (
    <table className='members-table table'>
      <TableHeader headers={headers} />
      <tbody>{membersTasksTableBody}</tbody>
    </table>
  );
};

MembersTasksTable.propTypes = {
  userTasks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MembersTasksTable;
