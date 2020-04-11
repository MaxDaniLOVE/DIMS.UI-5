import React from 'react';
import TableHeader from '../../UI/TableHeader';

const MembersTable = ({ members }) => {
  const headers = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Manage'];
  const membersTableBody = members.map((member, idx) => {
    const { id, name, lastName, directionId, education, startDate, birthDate } = member;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{`${name} ${lastName}`}</td>
        <td>{directionId}</td>
        <td>{education}</td>
        <td>{startDate}</td>
        <td>{birthDate}</td>
        <td>there will be btns</td>
      </tr>
    );
  });
  return (
    <table>
      <TableHeader headers={headers} />
      <tbody>{membersTableBody}</tbody>
    </table>
  );
};

export default MembersTable;
