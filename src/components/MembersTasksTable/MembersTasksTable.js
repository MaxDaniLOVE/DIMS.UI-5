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
import { SuccessIcon, FailureIcon, AddTrackIcon } from '../../assets/icons';
import DraggableTable from '../DraggableTable';
import DraggableRow from '../DraggableRow';
import { withSortFeatures } from '../../hoc';

const MembersTasksTable = ({ data, role, onSetMark, userId, sortFromZToA, sortFromAToZ }) => {
  const headers = membersTasksHeaders[role];
  const membersTasksTableBody = data.map((task, idx) => {
    const { deadlineDate, name, startDate, stateId, userTaskId, taskId } = task;
    const onSucced = () => onSetMark(userTaskId, 'success', taskId);
    const onFailed = () => onSetMark(userTaskId, 'fail', taskId);
    const isUser = role === 'USER';
    return (
      <DraggableRow key={userTaskId} draggableId={userTaskId} index={idx}>
        <>
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
            <td>
              <div className='admin-btns'>
                <SuccessButton onClick={onSucced}>
                  <SuccessIcon />
                </SuccessButton>
                <DangerButton onClick={onFailed}>
                  <FailureIcon />
                </DangerButton>
              </div>
            </td>
          )}
        </>
      </DraggableRow>
    );
  });
  return (
    <Layout>
      <Table className='members-task-table'>
        <>
          <TableHeader headers={headers} sortFromZToA={sortFromZToA} sortFromAToZ={sortFromAToZ} />
          <DraggableTable tableData={data} tableType='userTasks' userId={userId}>
            {membersTasksTableBody}
          </DraggableTable>
        </>
      </Table>
    </Layout>
  );
};

MembersTasksTable.propTypes = {
  data: PropTypes.arrayOf(
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
  userId: PropTypes.string.isRequired,
  sortFromZToA: PropTypes.func.isRequired,
  sortFromAToZ: PropTypes.func.isRequired,
};

export default withSortFeatures(MembersTasksTable);
