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
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>
          <OutlineButton onClick={openDataModal}>{userName}</OutlineButton>
        </td>
        <td>{directionId}</td>
        <td>{education}</td>
        <td>{stringStartDate}</td>
        <td>{ageInYears}</td>
        <td className={`td-btns td-btns__${role}`}>
          <LinkButton link={`/member/${id}/tasks`}>Tasks</LinkButton>
          <LinkButton link={`/member/${id}/progress`}>Progress</LinkButton>
          {role === 'ADMIN' ? (
            <>
              <Button onClick={openEditModal}>Edit</Button>
              <DangerButton onClick={deleteMember}>Delete</DangerButton>
            </>
          ) : null}
        </td>
      </tr>
    );
  });
  return (
    <Layout>
      <Table className='members-table'>
        <>
          <TableHeader headers={headers} />
          <tbody>{membersTableBody}</tbody>
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
