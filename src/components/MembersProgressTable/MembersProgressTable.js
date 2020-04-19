import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';

const MembersProgressTable = ({ progress }) => {
  const headers = ['#', 'Task', 'Note', 'Date'];
  const progressBody = progress.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId } = task;
    return (
      <tr key={taskTrackId}>
        <td>{idx + 1}</td>
        <td>{taskName}</td>
        <td>{trackNote}</td>
        <td>{new Date(trackDate).toLocaleDateString()}</td>
      </tr>
    );
  });
  return (
    <div className='table-wrapper'>
      <table className='members-table table'>
        <TableHeader headers={headers} />
        <tbody>{progressBody}</tbody>
      </table>
    </div>
  );
};

MembersProgressTable.propTypes = {
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default MembersProgressTable;
