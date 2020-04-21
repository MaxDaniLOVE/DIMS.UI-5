import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, DangerButton } from '../../UI/Buttons';
import Layout from '../Layout';
import Table from '../../UI/Table';

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
          <Button onClick={() => console.log(`edit ${taskId}`)}>Edit</Button>
          <DangerButton onClick={() => console.log(taskId)}>Delete</DangerButton>
        </td>
      </tr>
    );
  });
  return (
    <Layout>
      <Table>
        <>
          <TableHeader headers={headers} />
          <tbody>{tasksTableBody}</tbody>
        </>
      </Table>
    </Layout>
  );
};

TasksTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TasksTable;
