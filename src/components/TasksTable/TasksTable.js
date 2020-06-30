import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, DangerButton, OutlineButton } from '../../UI/Buttons';
import Layout from '../Layout';
import Table from '../../UI/Table';
import { taskTableHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate } from '../../utils/convertDate';
import { EditIcon, DeleteIcon } from '../../assets/icons';
import noteConverter from '../../utils/noteConverter';
import DraggableTable from '../DraggableTable';
import DraggableRow from '../DraggableRow';

const TasksTable = ({ tasks, onDeleteTask, onEditTaskModalOpen, onDataOpen }) => {
  const tasksTableBody = tasks.map(({ deadlineDate, name, startDate, taskId }, idx) => {
    const startString = millisecondsToDate(startDate);
    const deadlineString = millisecondsToDate(deadlineDate);
    const onEditTaskHandler = () => onEditTaskModalOpen(taskId);
    const onDeleteTaskHandler = () => onDeleteTask(taskId);
    const onOpenData = () => onDataOpen(taskId);
    return (
      <DraggableRow key={taskId} draggableId={taskId} index={idx}>
        <>
          <td>{idx + 1}</td>
          <td>
            <OutlineButton onClick={onOpenData}>{noteConverter(name, 25)}</OutlineButton>
          </td>
          <td>{startString}</td>
          <td>{deadlineString}</td>
          <td>
            <div className='admin-btns'>
              <Button onClick={onEditTaskHandler}>
                <EditIcon />
              </Button>
              <DangerButton onClick={onDeleteTaskHandler}>
                <DeleteIcon />
              </DangerButton>
            </div>
          </td>
        </>
      </DraggableRow>
    );
  });
  return (
    <Layout>
      <Table className='task-table'>
        <>
          <TableHeader headers={headers} />
          <DraggableTable tableData={tasks} tableType='tasks'>
            {tasksTableBody}
          </DraggableTable>
        </>
      </Table>
    </Layout>
  );
};

TasksTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTaskModalOpen: PropTypes.func.isRequired,
  onDataOpen: PropTypes.func.isRequired,
};

export default TasksTable;
