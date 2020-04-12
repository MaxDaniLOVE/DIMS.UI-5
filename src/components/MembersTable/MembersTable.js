import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Firebase from '../../services/Firebase';
import './MembersTable.scss';

const db = new Firebase();

const MembersTable = ({ members }) => {
  const headers = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Manage'];
  const membersTableBody = members.map((member, idx) => {
    const { id, name, lastName, directionId, education, startDate, birthDate } = member;
    const stringStartDate = new Date(startDate).toLocaleDateString();
    const ageMs = new Date().getTime() - new Date(birthDate).getTime();
    const ageInYears = new Date(ageMs).getFullYear() - 1970;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{`${name} ${lastName}`}</td>
        <td>{directionId}</td>
        <td>{education}</td>
        <td>{stringStartDate}</td>
        <td>{ageInYears}</td>
        <td>
          <button type='button' onClick={() => db.getUsersTasks(id)}>
            Tasks
          </button>
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

MembersTable.defaultProps = {
  members: [],
};

MembersTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
};

export default MembersTable;
