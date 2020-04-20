import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import { Button, DangerButton, LinkButton, OutlineButton } from '../../UI/Buttons';
import './MembersTable.scss';
import { membersHeaders as headers } from '../../utils/tableHeaders';
import { millisecondsToDate, millisecondsToAge } from '../../utils/convertDate';

const MembersTable = ({ members, onEditMemberModalOpen, onMemberDataOpen, onUserDelete }) => {
  const membersTableBody = members.map((member, idx) => {
    const { id, name, lastName, directionId, education, startDate, birthDate } = member;
    const stringStartDate = millisecondsToDate(startDate);
    const ageInYears = millisecondsToAge(birthDate);
    const openDataModal = () => onMemberDataOpen(id);
    const openEditModal = () => onEditMemberModalOpen(id);
    const deleteMember = () => onUserDelete(id);
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>
          <OutlineButton onClick={openDataModal}>{`${name} ${lastName}`}</OutlineButton>
        </td>
        <td>{directionId}</td>
        <td>{education}</td>
        <td>{stringStartDate}</td>
        <td>{ageInYears}</td>
        <td className='td-btns'>
          <LinkButton link={`/member/${id}/tasks`}>Tasks</LinkButton>
          <LinkButton link={`/member/${id}/progress`}>Progress</LinkButton>
          <Button onClick={openEditModal}>Edit</Button>
          <DangerButton onClick={deleteMember}>Delete</DangerButton>
        </td>
      </tr>
    );
  });
  return (
    <div className='table-wrapper'>
      <table className='members-table table'>
        <TableHeader headers={headers} />
        <tbody>{membersTableBody}</tbody>
      </table>
    </div>
  );
};

MembersTable.propTypes = {
  onEditMemberModalOpen: PropTypes.func.isRequired,
  onMemberDataOpen: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default MembersTable;
