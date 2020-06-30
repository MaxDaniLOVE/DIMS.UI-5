import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, DangerButton, LinkButton, OutlineButton } from '../../UI/Buttons';
import './membersTable.scss';
import { membersHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate, millisecondsToAge } from '../../utils/convertDate';
import Layout from '../Layout';
import Table from '../../UI/Table';
import noteConverter from '../../utils/noteConverter';
import { EditUserIcon, DeleteIcon, UserTasksIcon, UserProgressIcon } from '../../assets/icons';
import DraggableTable from '../DraggableTable';
import DraggableRow from '../DraggableRow';

const MembersTable = ({ members, onEditMemberModalOpen, onMemberDataOpen, onUserDelete, role }) => {
  const membersTableBody = members.map((member, idx) => {
    const { id, name, lastName, directionId, education, startDate, birthDate } = member;
    const stringStartDate = millisecondsToDate(startDate);
    const ageInYears = millisecondsToAge(birthDate);
    const openDataModal = () => onMemberDataOpen(id);
    const openEditModal = () => onEditMemberModalOpen(id);
    const deleteMember = () => onUserDelete(id);
    const userName = noteConverter(`${name} ${lastName}`, 10);
    return (
      <DraggableRow key={id} draggableId={id} index={idx}>
        <>
          <td>{idx + 1}</td>
          <td>
            <OutlineButton onClick={openDataModal}>{userName}</OutlineButton>
          </td>
          <td>{directionId}</td>
          <td>{education}</td>
          <td>{stringStartDate}</td>
          <td>{ageInYears}</td>
          <td>
            <div className={`td-btns td-btns__${role}`}>
              <LinkButton link={`/member/${id}/tasks`}>
                <UserTasksIcon />
              </LinkButton>
              <LinkButton link={`/member/${id}/progress`}>
                <UserProgressIcon />
              </LinkButton>
              {role === 'ADMIN' ? (
                <>
                  <Button onClick={openEditModal}>
                    <EditUserIcon />
                  </Button>
                  <DangerButton onClick={deleteMember}>
                    <DeleteIcon />
                  </DangerButton>
                </>
              ) : null}
            </div>
          </td>
        </>
      </DraggableRow>
    );
  });

  return (
    <Layout>
      <Table className='members-table'>
        <>
          <TableHeader headers={headers} />
          <DraggableTable tableData={members} tableType='members'>
            {membersTableBody}
          </DraggableTable>
        </>
      </Table>
    </Layout>
  );
};

MembersTable.propTypes = {
  role: PropTypes.string.isRequired,
  onEditMemberModalOpen: PropTypes.func.isRequired,
  onMemberDataOpen: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default MembersTable;
