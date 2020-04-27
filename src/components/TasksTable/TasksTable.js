import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, DangerButton } from '../../UI/Buttons';
import Layout from '../Layout';
import Table from '../../UI/Table';
import { taskTableHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate } from '../../utils/convertDate';

const TasksTable = ({ tasks, onDeleteTask, onEditTaskModalOpen }) => {
  const tasksTableBody = tasks.map(({ deadlineDate, name, startDate, taskId }, idx) => {
    const startString = millisecondsToDate(startDate);
    const deadlineString = millisecondsToDate(deadlineDate);
    const onEditTaskHandler = () => onEditTaskModalOpen(taskId);
    const onDeleteTaskHandler = () => onDeleteTask(taskId);
    return (
      <tr key={taskId}>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>{startString}</td>
        <td>{deadlineString}</td>
        <td className='admin-btns'>
          <Button onClick={onEditTaskHandler}>Edit</Button>
          <DangerButton onClick={onDeleteTaskHandler}>Delete</DangerButton>
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
  onDeleteTask: PropTypes.func.isRequired,
  onEditTaskModalOpen: PropTypes.func.isRequired,
};

export default TasksTable;
