import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Button from '../../UI/Button';
import Status from '../../UI/Status';
import './MembersTasksTable.scss';
import { membersTasksHeaders as headers } from '../../utils/tableHeaders';

const MembersTasksTable = ({ userTasks }) => {
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
        <td className='admin-btns'>
          <Button customClass='btn-success'>
            <p className='btn-inner'>Success!</p>
          </Button>
          <Button customClass='btn-danger'>
            <p className='btn-inner'>Fail!</p>
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <div className='table-wrapper'>
      <table className='members-table table'>
        <TableHeader headers={headers} />
        <tbody>{membersTasksTableBody}</tbody>
      </table>
    </div>
  );
};

MembersTasksTable.propTypes = {
  userTasks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MembersTasksTable;
