import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { membersProgressHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate } from '../../utils/convertDate';

const MembersProgressTable = ({ progress }) => {
  const progressBody = progress.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId } = task;
    return (
      <tr key={taskTrackId}>
        <td>{idx + 1}</td>
        <td>{taskName}</td>
        <td>{trackNote}</td>
        <td>{millisecondsToDate(trackDate)}</td>
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
