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
import TooltipWrapper from '../TooltipWrapper';
import removeStartNumbers from '../../utils/cutStartNumbers';
import DraggableTable from '../DraggableTable';
import DraggableRow from '../DraggableRow';
import { withSortFeatures } from '../../hoc';

const MembersProgressTable = ({
  data,
  isMemberTasks,
  onSubtaskDataOpen,
  onSubtaskDelete,
  onEditSubtaskModalOpen,
  userId,
}) => {
  const progressBody = data.map((task, idx) => {
    const { taskName, trackDate, trackNote, taskTrackId, taskId } = task;
    const onDeleteHandler = () => onSubtaskDelete(taskTrackId);
    const onEditHandler = () => onEditSubtaskModalOpen(taskTrackId);
    const onDataOpenHandler = () => onSubtaskDataOpen(taskTrackId);
    const id = removeStartNumbers(taskTrackId);
    return (
      <DraggableRow key={taskTrackId} draggableId={taskTrackId} index={idx}>
        <>
          <td>{idx + 1}</td>
          <td>
            {isMemberTasks ? (
              taskName
            ) : (
              <TooltipWrapper id={id} tooltip={taskName} maxValuelength={15}>
                <Link to={`/tasks/${taskId}`} id={id}>
                  {noteConverter(taskName, 15)}
                </Link>
              </TooltipWrapper>
            )}
          </td>
          <td>
            {isMemberTasks ? (
              <OutlineButton onClick={onDataOpenHandler}>{noteConverter(trackNote, 20)}</OutlineButton>
            ) : (
              trackNote
            )}
          </td>
          <td>{millisecondsToDate(trackDate)}</td>
          {isMemberTasks ? (
            <td>
              <div className='user-btns'>
                <Button onClick={onEditHandler}>
                  <EditIcon />
                </Button>
                <DangerButton onClick={onDeleteHandler}>
                  <DeleteIcon />
                </DangerButton>
              </div>
            </td>
          ) : null}
        </>
      </DraggableRow>
    );
  });

  const defaultClassName = 'members-progress-table';
  const className = isMemberTasks ? `${defaultClassName} user-progress` : defaultClassName;

  return (
    <Layout>
      <Table className={className}>
        <>
          <TableHeader
            tableType='progress'
            headers={isMemberTasks ? [...headers, { value: 'Manage', id: 'manage', isSortable: false }] : headers}
          />
          <DraggableTable tableData={data} tableType='progress' userId={userId}>
            {progressBody}
          </DraggableTable>
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
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  isMemberTasks: PropTypes.bool,
  onSubtaskDataOpen: PropTypes.func,
  onSubtaskDelete: PropTypes.func,
  onEditSubtaskModalOpen: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

export default withSortFeatures(MembersProgressTable, 'progress');
