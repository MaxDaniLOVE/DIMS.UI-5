import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, SuccessButton, DangerButton } from '../../UI/Buttons';
import Status from '../../UI/Status';
import './membersTasksTable.scss';
import { membersTasksHeaders as headers } from '../../utils/tableHeaders';
import Layout from '../Layout';
import Table from '../../UI/Table';

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
          <SuccessButton>Success!</SuccessButton>
          <DangerButton>Fail!</DangerButton>
        </td>
      </tr>
    );
  });
  return (
    <Layout>
      <Table>
        <>
          <TableHeader headers={headers} />
          <tbody>{membersTasksTableBody}</tbody>
        </>
      </Table>
    </Layout>
  );
};

MembersTasksTable.propTypes = {
  userTasks: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      ]),
    ),
  ).isRequired,
};

export default MembersTasksTable;
