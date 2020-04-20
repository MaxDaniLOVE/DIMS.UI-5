import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, OutlineButton, DangerButton } from '../../UI/Buttons';
import { membersProgressHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate } from '../../utils/convertDate';

const MembersProgressTable = ({
  progress,
  isMemberTasks,
  onSubtaskDataOpen,
  onAddSubtaskModalOpen,
  onSubtaskDelete,
}) => {
  const progressBody = progress.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId, taskId } = task;
    return (
      <tr key={taskTrackId}>
        <td>{idx + 1}</td>
        <td>
          {isMemberTasks ? (
            <OutlineButton onClick={() => onAddSubtaskModalOpen(taskId, taskName)}>{taskName}</OutlineButton>
          ) : (
            taskName
          )}
        </td>
        <td>
          {isMemberTasks ? (
            <OutlineButton onClick={() => onSubtaskDataOpen(taskTrackId)}>
              {`${trackNote.slice(0, 15)}...`}
            </OutlineButton>
          ) : (
            trackNote
          )}
        </td>
        <td>{millisecondsToDate(trackDate)}</td>
        {isMemberTasks ? (
          <td>
            <Button onClick={() => console.log(taskTrackId)}>Edit</Button>
            <DangerButton onClick={() => onSubtaskDelete(taskTrackId)}>Delete</DangerButton>
          </td>
        ) : null}
      </tr>
    );
  });
  return (
    <div className='table-wrapper'>
      <table className='members-table table'>
        <TableHeader headers={isMemberTasks ? [...headers, ''] : headers} />
        <tbody>{progressBody}</tbody>
      </table>
    </div>
  );
};

MembersProgressTable.defaultProps = {
  isMemberTasks: false,
  onSubtaskDataOpen: () => {},
};

MembersProgressTable.propTypes = {
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isMemberTasks: PropTypes.bool,
  onSubtaskDataOpen: PropTypes.func,
};

export default MembersProgressTable;
