import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Button from '../../UI/Button';

const MembersProgressTable = ({
  progress,
  isMemberTasks,
  onSubtaskDataOpen,
  onAddSubtaskModalOpen,
  onSubtaskDelete,
}) => {
  const headers = ['#', 'Task', 'Note', 'Date'];
  const progressBody = progress.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId, taskId } = task;
    return (
      <tr key={taskTrackId}>
        <td>{idx + 1}</td>
        <td>
          {isMemberTasks ? (
            <Button customClass='btn-link' onClick={() => onAddSubtaskModalOpen(taskId, taskName)}>
              <p className='btn-inner'>{taskName}</p>
            </Button>
          ) : (
            taskName
          )}
        </td>
        <td>
          {isMemberTasks ? (
            <Button customClass='btn-link' onClick={() => onSubtaskDataOpen(taskTrackId)}>
              <p className='btn-inner'>{`${trackNote.slice(0, 15)}...`}</p>
            </Button>
          ) : (
            trackNote
          )}
        </td>
        <td>{new Date(trackDate).toLocaleDateString()}</td>
        {isMemberTasks ? (
          <td>
            <Button onClick={() => console.log(taskTrackId)}>
              <p className='btn-inner'>Edit</p>
            </Button>
            <Button onClick={() => onSubtaskDelete(taskTrackId)} customClass='btn-danger'>
              <p className='btn-inner'>Delete</p>
            </Button>
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
  progress: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMemberTasks: PropTypes.bool,
  onSubtaskDataOpen: PropTypes.func,
};

export default MembersProgressTable;
