import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TableHeader from '../../UI/TableHeader';
import { Button, OutlineButton, DangerButton } from '../../UI/Buttons';
import Layout from '../Layout';
import Table from '../../UI/Table';
import { membersProgressHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate } from '../../utils/convertDate';
import noteConverter from '../../utils/noteConverter';
import './membersProgressTable.scss';
import { EditIcon, DeleteIcon } from '../../assets/icons';

const MembersProgressTable = ({
  progress,
  isMemberTasks,
  onSubtaskDataOpen,
  onSubtaskDelete,
  onEditSubtaskModalOpen,
}) => {
  const progressBody = progress.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId, taskId } = task;
    const onDeleteHandler = () => onSubtaskDelete(taskTrackId);
    const onEditHandler = () => onEditSubtaskModalOpen(taskTrackId);
    const onDataOpenHandler = () => onSubtaskDataOpen(taskTrackId);
    return (
      <tr key={taskTrackId}>
        <td>{idx + 1}</td>
        <td>{isMemberTasks ? taskName : <Link to={`/tasks/${taskId}`}>{noteConverter(taskName, 7)}</Link>}</td>
        <td>
          {isMemberTasks ? (
            <OutlineButton onClick={onDataOpenHandler}>{noteConverter(trackNote, 20)}</OutlineButton>
          ) : (
            trackNote
          )}
        </td>
        <td>{millisecondsToDate(trackDate)}</td>
        {isMemberTasks ? (
          <td className='user-btns'>
            <Button onClick={onEditHandler}>
              <EditIcon />
            </Button>
            <DangerButton onClick={onDeleteHandler}>
              <DeleteIcon />
            </DangerButton>
          </td>
        ) : null}
      </tr>
    );
  });
  return (
    <Layout>
      <Table className='members-progress-table'>
        <>
          <TableHeader headers={isMemberTasks ? [...headers, 'Manage'] : headers} />
          <tbody>{progressBody}</tbody>
        </>
      </Table>
    </Layout>
  );
};

MembersProgressTable.defaultProps = {
  isMemberTasks: false,
  onSubtaskDataOpen: () => {},
  onSubtaskDelete: () => {},
  onEditSubtaskModalOpen: () => {},
};

MembersProgressTable.propTypes = {
  progress: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isMemberTasks: PropTypes.bool,
  onSubtaskDataOpen: PropTypes.func,
  onSubtaskDelete: PropTypes.func,
  onEditSubtaskModalOpen: PropTypes.func,
};

export default MembersProgressTable;
