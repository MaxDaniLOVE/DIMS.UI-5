import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Button from '../../UI/Button';
import './MembersTable.scss';

const MembersTable = ({ members, onEditMemberModalOpen, onMemberDataOpen, onUserDelete }) => {
  const headers = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Manage'];
  const membersTableBody = members.map((member, idx) => {
    const { id, name, lastName, directionId, education, startDate, birthDate } = member;
    const stringStartDate = new Date(startDate).toLocaleDateString();
    const ageMs = new Date().getTime() - new Date(birthDate).getTime();
    const ageInYears = new Date(ageMs).getFullYear() - 1970;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>
          <Button onClick={() => onMemberDataOpen(id)} customClass='btn-link'>
            <p className='btn-inner'>{`${name} ${lastName}`}</p>
          </Button>
        </td>
        <td>{directionId}</td>
        <td>{education}</td>
        <td>{stringStartDate}</td>
        <td>{ageInYears}</td>
        <td className='td-btns'>
          <Button>
            <Link to={`/member/${id}/tasks`}>Tasks</Link>
          </Button>
          <Button>
            <Link to={`/member/${id}/progress`}>Progress</Link>
          </Button>
          <Button onClick={() => onEditMemberModalOpen(id)}>
            <p className='btn-inner'>Edit</p>
          </Button>
          <Button onClick={() => onUserDelete(id)} customClass='btn-danger'>
            <p className='btn-inner'>Delete</p>
          </Button>
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
