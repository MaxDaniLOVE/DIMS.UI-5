import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, OutlineButton, DangerButton } from '../../UI/Buttons';
import Layout from '../Layout';
import Table from '../../UI/Table';
import { membersProgressHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate } from '../../utils/convertDate';

const MembersProgressTable = ({
  progress,
  isMemberTasks,
  onSubtaskDataOpen,
  onAddSubtaskModalOpen,
  onSubtaskDelete,
  onEditSubtaskModalOpen,
}) => {
  const progressBody = progress.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId, taskId } = task;
    const onDeleteHandler = () => onSubtaskDelete(taskTrackId);
    const onEditHandler = () => onEditSubtaskModalOpen(taskTrackId);
    const omAddHandler = () => onAddSubtaskModalOpen(taskId, taskName);
    const onDataOpenHandler = () => onSubtaskDataOpen(taskTrackId);
    return (
      <tr key={taskTrackId}>
        <td>{idx + 1}</td>
        <td>{isMemberTasks ? <OutlineButton onClick={omAddHandler}>{taskName}</OutlineButton> : taskName}</td>
        <td>
          {isMemberTasks ? (
            <OutlineButton onClick={onDataOpenHandler}>{`${trackNote.slice(0, 15)}...`}</OutlineButton>
          ) : (
            trackNote
          )}
        </td>
        <td>{millisecondsToDate(trackDate)}</td>
        {isMemberTasks ? (
          <td>
            <Button onClick={onEditHandler}>Edit</Button>
            <DangerButton onClick={onDeleteHandler}>Delete</DangerButton>
          </td>
        ) : null}
      </tr>
    );
  });
  return (
    <Layout>
      <Table>
        <>
          <TableHeader headers={isMemberTasks ? [...headers, ''] : headers} />
          <tbody>{progressBody}</tbody>
        </>
      </Table>
    </Layout>
  );
};

MembersProgressTable.defaultProps = {
  isMemberTasks: false,
  onSubtaskDataOpen: () => {},
  onAddSubtaskModalOpen: () => {},
  onSubtaskDelete: () => {},
  onEditSubtaskModalOpen: () => {},
};

MembersProgressTable.propTypes = {
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isMemberTasks: PropTypes.bool,
  onSubtaskDataOpen: PropTypes.func,
  onAddSubtaskModalOpen: PropTypes.func,
  onSubtaskDelete: PropTypes.func,
  onEditSubtaskModalOpen: PropTypes.func,
};

export default MembersProgressTable;
