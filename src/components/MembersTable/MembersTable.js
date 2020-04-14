import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TableHeader from '../../UI/TableHeader';
import Button from '../../UI/Button';
import './MembersTable.scss';

const MembersTable = ({ members, onEditMember }) => {
  const headers = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Manage'];
  const membersTableBody = members.map((member, idx) => {
    const { id, name, lastName, directionId, education, startDate, birthDate } = member;
    const stringStartDate = new Date(startDate).toLocaleDateString();
    const ageMs = new Date().getTime() - new Date(birthDate).getTime();
    const ageInYears = new Date(ageMs).getFullYear() - 1970;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td onClick={() => onEditMember(id)}>{`${name} ${lastName}`}</td>
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
          <Button>
            <Link to='/'>Edit</Link>
          </Button>
          <Button customClass='btn-danger'>
            <Link to='/'>Delete</Link>
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
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MembersTable;
