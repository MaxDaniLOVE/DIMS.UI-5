import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { LinkButton, SuccessButton, DangerButton } from '../../UI/Buttons';
import Status from '../../UI/Status';
import './membersTasksTable.scss';
import { membersTasksHeaders } from '../../utils/tableHeaders';
import Layout from '../Layout';
import Table from '../../UI/Table';
import { millisecondsToDate } from '../../utils/convertDate';
import { ReactComponent as SuccessIcon } from '../../assets/icons/thumbs-up-solid.svg';
import { ReactComponent as FailureIcon } from '../../assets/icons/thumbs-down-solid.svg';
import { ReactComponent as AddTrackIcon } from '../../assets/icons/sticky-note-solid.svg';

const MembersTasksTable = ({ userTasks, role, onSetMark }) => {
  const headers = membersTasksHeaders[role];
  const membersTasksTableBody = userTasks.map((task, idx) => {
    const { deadlineDate, name, startDate, stateId, userTaskId, taskId } = task;
    const onSucced = () => onSetMark(userTaskId, 'success', taskId);
    const onFailed = () => onSetMark(userTaskId, 'fail', taskId);
    const isUser = role === 'USER';
    return (
      <tr key={userTaskId}>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>{millisecondsToDate(startDate)}</td>
        <td>{millisecondsToDate(deadlineDate)}</td>
        <td>
          <Status stateId={stateId} />
        </td>
        {!isUser ? null : (
          <td>
            <LinkButton link={`/member/subtasks/${taskId}`}>
              <AddTrackIcon />
            </LinkButton>
          </td>
        )}
        {isUser ? null : (
          <td className='admin-btns'>
            <SuccessButton onClick={onSucced}>
              <SuccessIcon />
            </SuccessButton>
            <DangerButton onClick={onFailed}>
              <FailureIcon />
            </DangerButton>
          </td>
        )}
      </tr>
    );
  });
  return (
    <Layout>
      <Table className='members-task-table'>
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
  role: PropTypes.string.isRequired,
  onSetMark: PropTypes.func.isRequired,
};

export default MembersTasksTable;
