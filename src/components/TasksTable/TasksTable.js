import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Button from '../../UI/Button';

const TasksTable = ({ tasks }) => {
  const headers = ['#', 'Name', 'Start', 'Deadline', ''];
  const tasksTableBody = tasks.map(({ deadlineDate, name, startDate, taskId }, idx) => {
    const startString = new Date(startDate).toLocaleDateString();
    const deadlineString = new Date(deadlineDate).toLocaleDateString();
    return (
      <tr key={taskId}>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>{startString}</td>
        <td>{deadlineString}</td>
        <td className='admin-btns'>
          <Button>
            <p className='btn-inner'>Edit</p>
          </Button>
          <Button customClass='btn-danger'>
            <p className='btn-inner'>Delete</p>
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <div className='table-wrapper'>
      <table className='members-table table'>
        <TableHeader headers={headers} />
        <tbody>{tasksTableBody}</tbody>
      </table>
    </div>
  );
};

TasksTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TasksTable;
